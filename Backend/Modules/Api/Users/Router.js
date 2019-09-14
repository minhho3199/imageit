const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./User');
require('dotenv').config();

router.post('/register', (req, res) => {
      //See if user already exists
      User.findOne({
            email: req.body.email
      })
            .then(user => {
                  // If user exists then error, else create new user
                  if (user) {
                        return res.status(400).json({
                              "error": "Email already exists",
                        });
                  } else {
                        const newUser = new User({
                              name: req.body.name,
                              email: req.body.email,
                              password: req.body.password,
                        });
                        //Hash password
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                              if (err) throw err;
                              newUser.password = hash;
                              newUser.save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err));
                        });
                  }
            });
});

router.post('/login', (req, res) => {
      User.findOne({
            email: req.body.email
      })
            .then(user => {
                  // If email is found
                  if (user) {
                        // Compare to see if the passwords match
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                              const payload = {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                              }
                              // Sign the payload
                              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                    // Time until log in expires
                                    expiresIn: 60
                              })
                              res.send(token);
                              // If password doesn't match
                        } else {
                              res.status(400).json({ error: "Password is incorrect" });
                        }
                        // If email is not found
                  } else {
                        res.status(400).json({ error: "User does not exist" });
                  }
            })
            .catch(err => {
                  res.send("error: " + err);
            })
})
module.exports = router;
