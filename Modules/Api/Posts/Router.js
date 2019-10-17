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
        .then(post => {
            User.findByIdAndUpdate({ _id: req.body.author }, { $inc: { postCount: 1 } })
                .then(data => {
                    console.log(data);
                })
            res.json(post)
        })
        .catch(err => res.json(err));
})

//This code gathers the 'Posts' placed on the website formt he databse, since we use an external server (MongoDB) we do not have the files stored locally.
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
        id: -1
    }).skip(count).limit(5)
        .populate('author', 'name')
        .exec((err, img) => {
            if (err) {
                console.log(err);
            }
        })
})
//This cose enables users who have created an account to post Comments on other peoples threads in the form of a reactionary image.
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

router.post("/comment/reply/:postID/:commentID", auth, upload.single('image'), (req, res) => {
    const newReply = {
        image: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        createBy: req.body.createBy,
    }
    Post.findOneAndUpdate({ _id: req.params.postID, "comment._id": req.params.commentID }, { $push: { "comment.$.replies": newReply } })
        .then(data => {
            res.send(data.comment.$.replies);
        })
        .catch(err => res.send(err));
})

router.get("/comment/reply/:postID/:commentID", (req, res) => {
    var i = 0;
    Post.findOne({ _id: req.params.postID }, (err, img) => {
        if (err) res.send(err);
        while (true) {
            if (!(img.comment[i]._id.equals(req.params.commentID))) {
                i++;
            }
            else {
                break;
            }
        }
        res.contentType('json');
        res.send(img.comment[i].replies)
    }).populate("comment.replies.createBy", "name")
        .exec(err => {
            if (err) console.log(err)
        })
})

//This code enables the access of converting the comments from the Database to visuale format and retrieving the data stored while also updating it in real time.
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

//This code enables the user of Reactionary Emojis which are able to be replied to by any person who is logged in. These reactionary images are tracked internally and shown visually to the user who views the thread.
router.post("/likes/:postID", auth, upload.single("emoji"), (req, res) => {
    const newReaction = {
        emoji: req.body.emoji,
        by: req.body.by,
    }
    Post.updateOne({ _id: req.params.postID }, { $pull: { reactions: { by: req.body.by } } }, (err, obj) => {
        if (err) console.log(err);
        Post.findOneAndUpdate({ _id: req.params.postID }, { $push: { reactions: newReaction }, $set: {reactCount: req.body.count}})
            .then((data) => {
                res.send(data.reactions);
            })
            .catch(err => res.send(err));
    })
})

//When a user is logged in and has created a post themselfs, they are able to delete it from the website, this connects to the database and accesess it directly, removing it.
router.delete("/delete/:postID", auth, (req, res) => {
    Post.findOne({ _id: req.params.postID }, (err, post) => {
        User.findOneAndUpdate({ _id: post.author }, { $inc: { postCount: -1 } }, (err, obj) => {
            Post.findOne({ _id: req.params.postID }).deleteOne()
            .exec((err, post) => {
                if (err) console.log(err);
            })
        })
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