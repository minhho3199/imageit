const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./Modules/Api/Users/Router');
const posts = require('./Modules/Api/Posts/Router');
const path = require("path")
const app = express();
const PORT = 8080;

require('dotenv').config();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//This code is based on the tutorial by Rishi Prasad on blog.bitsrc.io
//See https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

app.use("/api/users", users);
app.use("/api/posts", posts);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
  });

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});