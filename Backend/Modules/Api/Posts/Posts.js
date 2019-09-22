const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Post Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    author: 
    {
        type: Schema.Types.ObjectId, 
        ref: "users",
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    like: {
        type: Number,
        default: 0
    },
    comment: [{
        createBy: {type: Schema.Types.ObjectId, ref: "users", required: true},
        image: {type: Buffer, required: true},
        contentType: {
            type: String,
            required: true,
        },
    }]
});

//Export the Schema so that it can be used outside
module.exports = Post = mongoose.model("posts", PostSchema);
