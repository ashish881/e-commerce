const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const generateToken = require('../utils/generateToken');

// get token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    // check the email is exist and password match..
    // send the data along with token user id

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
});

//Private Route
const getUserProfile = asyncHandler(async (req, res) => {
    //find the id got from the token decoded and send the user data which are logged in...
    const user = await User.findById(req.userss._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.send('no data')
    }
})


module.exports = { authUser, getUserProfile };