const express = require('express');
const User = require('../models/UserModel');
const { 
    getUser,
    deleteUser,
    editUser
} = require('../controllers/UserController');
//middleware - auth
const requireAuth = require('../middleware/requireAuth.js')
//middleware - file upload
const uploadFile = require('../middleware/upload');

//invoking an instance of router
const router = express.Router();

//using the middleware, to prevent unauthenticated user using those routes
router.use(requireAuth);

//get the user
router.get('/user-profile', getUser);

//edit user
router.patch('/edit-profile', uploadFile.single('file'), editUser);

//delete user
router.delete('/delete-account', deleteUser);


//exporting the router
module.exports = router