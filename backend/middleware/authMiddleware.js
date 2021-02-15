const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');
const expressHandler = require('express-async-handler')


const protect = expressHandler(async (req, res, next) => {

    let token
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //get the token 
            token = req.headers.authorization.split(' ')[1]

            //check the token and verify it..
            //get the user id 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded) 

            //find with decoded id in user model 
            req.userss = await User.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }

})

module.exports = protect;