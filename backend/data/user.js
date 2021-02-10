const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin Ashish',
        email: 'ashish@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Aditya',
        email: 'aditya@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Javed',
        email: 'javed@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
];

module.exports = users;

