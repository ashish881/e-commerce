const express = require('express');
const {authUser, getUserProfile, registerUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express();

router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile);
router.post('/',registerUser)


module.exports = router; 