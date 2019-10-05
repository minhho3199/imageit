const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User Schema
const UserSchema = new Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
      },
      password: {
            type: String,
            required: true,
      },
      date: {
            type: Date,
            default: Date.now,
      },
      postCount: {
            type: Number,
            default: 0
      }
});

//Export the Schema so that it can be used outside
module.exports = User = mongoose.model("users", UserSchema);