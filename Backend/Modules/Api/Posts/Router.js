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
module.exports = router;
