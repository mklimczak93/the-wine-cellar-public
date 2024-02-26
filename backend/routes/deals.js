const express = require('express');
const Deal = require('../models/DealModel');
const { 
    getDeals,
    createDeals
} = require('../controllers/DealController');
//middleware - auth
const requireAuth = require('../middleware/requireAuth.js')

//invoking an instance of router
const router = express.Router();

//using the middleware, to prevent unauthenticated user using those routes
router.use(requireAuth);

//get all deals
router.get('/:id', getDeals);

//create set of deals for chosen wine
router.post('/:id', createDeals);


//exporting the router
module.exports = router