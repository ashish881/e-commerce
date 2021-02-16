const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const generateToken = require('../utils/generateToken');

//login auth
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

//register a new user
// get token
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check user exist
    const userExits = await User.findOne({ email })

    //if user exist then throw error
    if (userExits) {
        res.status(400); //bad request
        throw new Error('User Already Exist')
    }

    //if user not exist then create

    const user = await User.create({
        name,
        email,
        password // unencrypted plain text
    })

    //If everything ok and user is created then send the response
    // Now we have to authenticate after register

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }

});

//Private Route
const getUserProfile = asyncHandler(async (req, res) => {
    //find the id got from the token decoded and send the user data which are logged in...
    //we can use req.userss any protecting routes
    const user = await User.findById(req.userss._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})


module.exports = { authUser, getUserProfile, registerUser };