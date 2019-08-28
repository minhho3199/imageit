const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

//DB Config
const db = require('./Config/Keys').mongoURI;
const users = require('./Modules/Api/Users/Router');

app.use(express.urlencoded());
app.use(express.json());

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
      .then(() => console.log("MongoDB connected successfully"))
      .catch(err => console.log(err));

app.use("/api/users", users);

app.listen(PORT, () => {
      console.log(`Your server is running on port ${PORT}`);
});