const express = require('express');
const router = express.Router();
const Post = require('./Posts');
const User = require('../Users/User')
require('dotenv').config();
const multer = require('multer');

const fs = require('fs');
const auth = require('../../../auth')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage });

router.post("/create", auth, upload.single("image"), (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        image: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        author: req.body.author,
    })
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
})

//getting all the posts from the database
router.get("/", (req, res) => {
    Post.find({}, (err, img) => {
        if (err) {
            res.send(err);
        }
        res.contentType('json');
        res.send(img);
    })
        .sort({
            _id: -1
        })
        .populate('author', 'name')
        .exec(err => {
            if (err) {
                console.log(err);
            }
        })
})

//Posting a new comment
router.post("/comment/:postID", auth, upload.single('image'), (req, res) => {
    const newComment = {
        image: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        createBy: req.body.createBy,
    }
    Post.findOneAndUpdate({ _id: req.params.postID }, { $push: { "comment": newComment } })
        .then(data => {
            res.send(data.comment);
        })
        .catch(err => res.send(err));
})

//Getting all the comments of the post
router.get("/comment/:postID", (req, res) => {
    Post.findOne({ _id: req.params.postID }, (err, img) => {
        res.contentType('json');
        res.send(img.comment)
    }).populate("comment.createBy", "name")
        .exec(err => {
            if (err) console.log(err)
        })
})

//Posting a new reaction for the post
router.post("/likes/:postID", auth, (req, res) => {
    // Post.findOne({
    //     by: req.body.by
    // }).then(post => {
    //     if (post) {
    //         return res.status(400).json({
    //             "error": "Person already liked",
    //         });
    //     } else {
    console.log(req.body.by);
    const newReaction = {
        emoji: req.body.emoji,
        by: req.body.by,
    }
    Post.findOneAndUpdate({ _id: req.params.postID }, { $push: { "reactions": newReaction } })
        .then(data => {
            res.send(data.reactions);
        })
        .catch(err => res.send(err));
    // }
    // })

})
module.exports = router;
