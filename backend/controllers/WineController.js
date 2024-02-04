const Wine = require('../models/WineModel');
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

//get the cellar with all the wines
const getCellar = async (req, res) => {
    //getting user_id which is attached to req object (from middleware)
    const userId = req.user._id 
    //getting all wines & sorting them at discending order; filtering/finding by userId
    const cellar = await Wine.find({ userId }).sort({createdAt: -1})
    res.status(200).json(cellar)
};

//get chosen bottle of wine
const getChosenWine = async (req, res) => {
    //getting the id from changeable part of the route parameters
    const {id} = req.params
    //checking whether given id fits the mongodb/mongoose id standard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    //getting Wine by id
    const chosenWine = await Wine.findById(id)
    //if wine does not exist - send back error
    if (!chosenWine) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    res.status(200).json(chosenWine)
};

//post/add a new bottle of wine
const addNewWine = async (req, res) => {
    //destructuring the text data
    // const { name, wineType, sweatness, denomination, grape, origin, year, notes, pairing } = req.files.textData;
    // const { name, wineType, sweatness, denomination, grape, origin, year, notes, pairing } = req.body;
    // const { name, wineType, sweatness, denomination, grape, origin, year, notes, pairing } = JSON.parse(req.body);
    const { name, wineType, sweatness, denomination, grape, origin, year, notes, pairing, randomWinePath } = JSON.parse(req.body.textData);
    
    //making sure all required fields are given
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    };
    if (!wineType) {
        emptyFields.push('wineType');
    };
    if (!sweatness) {
        emptyFields.push('sweatness');
    };
    if (!origin) {
        emptyFields.push('origin');
    };
    if (!year) {
        emptyFields.push('year');
    };
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
    };
    //checking if file is included
    let imagePath = '';
    if (req.file) {
        let imagePathImported = req.file.path;
        //self-uploaded files - example path "..\frontend\public\uploads\1706130300991.JPG"
        imagePath = imagePathImported.split('\\')[4];
    } else {
        //files chosen from defaults - example path "../assets/wine-patterns/pattern03s.png"
        imagePath = randomWinePath.split('/')[3];
    }
    // //trying to create a new wine object with the imported Wine Model
    try {
        const userId = req.user._id;
        console.log(userId)
        const wine = await Wine.create({name, wineType, sweatness, denomination, grape, origin, year, notes, pairing, userId, imagePath});
        //sending reponse code 200 & json object
        res.status(200).json(wine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//delete chosen bottle of wine
const deleteWine = async (req,res) => {
    //getting the id from changeable part of the route parameters
    const {id} = req.params
    //checking whether given id fits the mongodb/mongoose id standard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    //getting wine by id and deleting it
    const chosenWine = await Wine.findOneAndDelete({_id: id})
    //if wine does not exist - send back error
    if (!chosenWine) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    res.status(200).json(chosenWine)
};

//edit chosen bottle of wine
const editWine = async (req,res) => {
    //getting the id from changeable part of the route parameters
    const {id} = req.params
    //checking whether given id fits the mongodb/mongoose id standard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    const { name, wineType, sweatness, denomination, grape, origin, year, notes, pairing, randomWinePath, existingImagePath } = JSON.parse(req.body.textData);
    console.log(JSON.parse(req.body.textData));
    //making sure all required fields are given
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    };
    if (!wineType) {
        emptyFields.push('wineType');
    };
    if (!sweatness) {
        emptyFields.push('sweatness');
    };
    if (!origin) {
        emptyFields.push('origin');
    };
    if (!year) {
        emptyFields.push('year');
    };
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
    };
    //checking if file is included
    let imagePath = '';
    if (req.file) {
        let imagePathImported = req.file.path;
        //self-uploaded files - example path "..\frontend\public\uploads\1706130300991.JPG"
        imagePath = imagePathImported.split('\\')[4];
    } else if (randomWinePath) {
        //files chosen from defaults - example path "../assets/wine-patterns/pattern03s.png"
        imagePath = randomWinePath.split('/')[3];
    } else if (existingImagePath) {
        //already exisinting image path
        imagePath = existingImagePath;
    } else {
        //none file added
        imagePath = existingImagePath;
    }


    //updating wine by adding the data from req.body
    const chosenWine = await Wine.findOneAndUpdate({_id: id}, {
        name, wineType, sweatness, denomination, grape, origin, year, notes, pairing, id, imagePath
    })

    //if wine does not exist - send back error
    if (!chosenWine) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    res.status(200).json(chosenWine)
};

//exporting functions
module.exports = {
    getCellar,
    getChosenWine,
    addNewWine,
    deleteWine,
    editWine
};