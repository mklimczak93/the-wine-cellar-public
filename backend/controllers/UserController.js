const User = require('../models/UserModel');
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken');
require('dotenv').config();


//using json web token - do not put any sensitive data into the payload - user remains loggedin for 3 days (3d)
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
//refreshing the token
const refreshToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET)
}

//register as a new user
const registerUser = async (req,res) => {
    const { email, password, birthDate } = req.body;
    //trying to create a user and catching errors using the created register method (from UserController);
    try {
        const user = await User.register(email, password, birthDate);
        //creating JW token
        const token = createToken(user._id);
        //setting up 200 status & sending back json with the email & JW token
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

//login as a user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
     //trying login the user with the login method from UserModel
     try {
        const user = await User.login(email, password);
        //creating JW token
        const token = createToken(user._id);
        //setting up 200 status & sending back json with the email & JW token
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    };
}

//get the user profile
const getUser = async (req,res) => {
    //getting id from request (from Auth middleware)
    const userId = req.user._id 
    //getting User by id
    const currentUser = await User.findById(userId);
    //if wine does not exist - send back error
    if (!currentUser) {
        return res.status(404).json({error: 'User not found.'})
    }
    res.status(200).json(currentUser)
}

//edit user's data
const editUser = async (req,res) => {
    //getting id from request (from Auth middleware)
    const userId = req.user._id 
    //getting User by id
    const currentUser = await User.findById(userId);
    //if wine does not exist - send back error
    if (!currentUser) {
        return res.status(404).json({error: 'User not found.'})
    }
    //getting old data
    let location = currentUser.location;
    let firstName = currentUser.firstName;
    let lastName = currentUser.lastName;
    let changedPhoto = '';
    //getting data sent
    if (req.body) {
        const receivedBody = JSON.parse(req.body.textData)
        if (receivedBody.location) {
            location = receivedBody.location
        }
        if (receivedBody.firstName) {
            firstName = receivedBody.firstName
        }
        if (receivedBody.lastName) {
            lastName = receivedBody.lastName
        }
        if (receivedBody.changedPhoto) {
            changedPhoto = receivedBody.changedPhoto
        }
    }
    //getting file location
    //checking if file is included
    let imagePath = currentUser.profilePhoto;
    //checking if default photo is included
    if (changedPhoto) {
        imagePath = '..\\frontend\\public\\uploads\\' + changedPhoto;
    }
    if (req.file) {
        imagePath = req.file.path;
    } 
    //creating conditions for update
    const updateData = {
        firstName: firstName,
        lastName: lastName,
        location: location,
        profilePhoto: imagePath
    }
    const conditions = {
        _id : userId 
    }
    // console.log(updateData, conditions)
    //updating the user
    const editedUser = await User.findOneAndUpdate(conditions, updateData, {new: true});
    
    if (!editedUser) {
        console.log('400')
        return res.status(400).json({error: 'Update of user data not successful.'})
    } else {
        // console.log(editedUser)
        return res.status(200).json({mssg: 'The profile data was successfully edited.'})
    }
    
}


//delete user accunt
const deleteUser = async (req,res) => {
    //getting id from request (from Auth middleware)
    const userId = req.user._id 
    //getting User by id
    const currentUser = await User.findById(userId);
    //if wine does not exist - send back error
    if (!currentUser) {
        return res.status(404).json({error: 'User not found.'})
    }
    //creating conditions for delete
    const conditions = {
        _id : userId 
    }
    //deleting the user
    const deleteOutcome = await User.findOneAndDelete(conditions);
    console.log(deleteOutcome)
    if (!deleteOutcome) {
        return res.status(400).json({error: 'The delete operation was unsuccessful.'})
    } else {
        return res.status(200).json({mssg: 'User account deleted.'})
    }
}


//exporting functions
module.exports = {
    registerUser,
    loginUser,
    getUser,
    editUser,
    deleteUser
};