const express = require('express');
const router = express.Router();
const Post = require('./Posts');
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
    })
    newPost.save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
})

router.get("/", (req, res) => {
    Post.find({}, (err, img) => {
        if(err) {
            res.send(err);
        }
        console.log(img);
        res.contentType('json');
        res.send(img);
    })
})
module.exports = router;
