const express = require('express');
const Wine = require('../models/WineModel');
const { 
    getCellar,
    getChosenWine,
    addNewWine,
    deleteWine,
    editWine
} = require('../controllers/WineController');
//middleware - auth
const requireAuth = require('../middleware/requireAuth.js')
//middleware - file upload
const uploadFile = require('../middleware/upload');

//invoking an instance of router
const router = express.Router();

//using the middleware, to prevent unauthenticated user using those routes
router.use(requireAuth);

//get the cellar with all the wines
router.get('/', getCellar);

//get chosen bottle of wine
router.get('/:id', getChosenWine);

//post a new bottle of wine
router.post('/adding-new-wine', uploadFile.single('file'), addNewWine);

//delete chosen bottle of wine
router.delete('/:id', deleteWine);

//edit chosen bottle of wine
router.patch('/:id', uploadFile.single('file'), editWine);



//exporting the router
module.exports = router