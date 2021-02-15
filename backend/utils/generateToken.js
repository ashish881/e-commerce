const jwt = require('jsonwebtoken');

//Add the user id on the payload
//generate the token

const generateToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : '30d'
 })
}

module.exports = generateToken;