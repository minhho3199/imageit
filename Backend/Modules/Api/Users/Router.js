const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./User');
require('dotenv').config();

//This code is based on an answer by "MoreCodes" on Youtube
//See https://www.youtube.com/watch?v=S9maJY5JcZc
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

//This code is based on an answer by "MoreCodes" on Youtube
//See https://www.youtube.com/watch?v=S9maJY5JcZc
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
                                    expiresIn: '1h'
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

router.get('/leaderboards', (req, res) => {
      User.find({}, (err, user) => {
            if(err) {
                  res.send(err)
            }
            res.contentType("json");
            res.send(user);
      }).sort ({
            postCount: -1
      }).limit(5)
})
module.exports = router;
