const jwt = require('jsonwebtoken');
require('dotenv').config();

//Middleware for authorization
function auth(req,res,next) {
    const token = req.header("Authorization");

    if(!token) res.status(401).json({ msg: "No token, authorization required"});
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(e) {
        res.status(400).json({
            msg: "token is not valid"
        });
    }
}
module.exports = auth;