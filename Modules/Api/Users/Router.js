const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./User');
require('dotenv').config();

//This code is based on an answer by "MoreCodes" on Youtube
//See https://www.youtube.com/watch?v=S9maJY5JcZc
router.post('/register', (req, res) => {
      //This code checks current created users to see if they already exist/match. With this we then follow the ongoing prompts of code.
      User.findOne({
            email: req.body.email
      })
            .then(user => {
                  // This code checks to see if a User already exists, it then informs the user to re-try with a different attempt
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
                        //This code uses Bcrypt to encode the Passwords created by the user, this is to increase security and maintain high levels of data safety.
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
//This code is used to create the connection between React, Mongo and NodeJS to create a proper Register and Login page. This of course is used by the users who wish to login or create accounts for the webpage.
router.post('/login', (req, res) => {
      User.findOne({
            email: req.body.email
      })
            .then(user => {
                  // This code checks the users Email, similar to the username however Emails are more specific in terms of access.
                  if (user) {
                        // This code checks to make sure the password entered by the user that was created and stored in the database matches what has been inputed on the login.
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                              const payload = {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                              }
                              //This code is whats called a 'Sign the Payload' in where transmitting data safely between two destinations is important for keeping data and information stored safe.
                              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                    //This code simply allows the user to Idle for a period of time on the login page before being disconnected, this is due to needing to save bandwith and resources on more active users.
                                    expiresIn: '1h'
                              })
                              res.send(token);
                              //This code recieves the information from the payload to see if the two passwords are matching from the de-cryption.
                        } else {
                              res.status(400).json({ error: "Password is incorrect" });
                        }
                        //This code explains that if an email is not found or incorrect it will inform the user, like with the prior password code.
                  } else {
                        res.status(400).json({ error: "User does not exist" });
                  }
            })
            .catch(err => {
                  res.send("error: " + err);
            })
})

//This code retrieves the data about the number of posts each user has and sorts them to place in the leaderboard
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
