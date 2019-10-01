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
router.get("/new", (req, res) => {
    //This code by user omererbil on github.com
    //See https://github.com/wprl/baucis/issues/303
    const count = Number(req.query.count);
    //
    Post.find({}, (err, img) => {
        if (err) {
            res.send(err);
        }
        res.contentType('json');
        res.json(img);
    }).sort({
        _id: -1
    }).skip(count).limit(5)
        .populate('author', 'name')
        .exec((err, img) => {
            if (err) {
                console.log(err);
            }
        })
})
router.get("/popular", (req, res) => {
    //This code by user omererbil on github.com
    //See https://github.com/wprl/baucis/issues/303
    const count = Number(req.query.count);
    //
    Post.find({}, (err, img) => {
        if (err) {
            res.send(err);
        }
        res.contentType('json');
        res.json(img);
    }).sort({
        reactCount: -1,
        _id: -1
    }).skip(count).limit(5)
        .populate('author', 'name')
        .exec((err, img) => {
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
        if (err) res.send(err);
        res.contentType('json');
        res.send(img.comment)
    }).populate("comment.createBy", "name")
        .exec(err => {
            if (err) console.log(err)
        })
})

//Posting a new reaction for the post
router.post("/likes/:postID", auth, upload.single("emoji"), (req, res) => {
    const newReaction = {
        emoji: req.body.emoji,
        by: req.body.by,
    }
    Post.updateOne({ _id: req.params.postID }, { $pull: { reactions: { by: req.body.by } }}, (err, obj) => {
        if (err) console.log(err);
        Post.findOneAndUpdate({ _id: req.params.postID }, { $push: { reactions: newReaction }, $inc: {reactCount: 1} })
            .then((data) => {
                res.send(data.reactions);
            })
            .catch(err => res.send(err));
    })
})

//Delete a post
router.delete("/delete/:postID", auth, (req, res) => {
    Post.findOne({ _id: req.params.postID }).deleteOne().exec(err => {
        if (err) console.log(err);
    })
})

router.post("/update/:postID", auth, upload.single("image"), (req, res) => {
    const post = {
        title: req.body.title,
        image: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        author: req.body.author,
    };

    Post.findOneAndUpdate({ _id: req.params.postID }, { $set: post }, (err, obj) => {
        if (err) console.log(err);
        res.send(obj);
    })
})
module.exports = router;