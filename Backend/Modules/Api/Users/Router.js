const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('./User');

router.post('/register', (req, res) => {
      //See if user already exists
      User.findOne({
            email: req.body.email
      })
      .then(user => {
            // If user exists then error, else create new user
            if(user) {
                  return res.status(400).json({
                        email: "Email already exists"
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

module.exports = router;
