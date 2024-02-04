const express = require('express');
const User = require('../models/UserModel');
const { 
    loginUser,
    registerUser
} = require('../controllers/UserController');


//invoking an instance of router
const router = express.Router();

//register user
router.post('/register', registerUser);

//login user
router.post('/login', loginUser);

//exporting the router
module.exports = router