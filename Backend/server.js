const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const users = require('./Modules/Api/Users/Router');
const app = express();
const PORT = 5000;

require('dotenv').config();
// require("./Config/Passport")(passport);

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
// app.use(passport.initialize());

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

app.use("/api/users", users);

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});