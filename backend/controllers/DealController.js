const DealModel = require('../models/DealModel');
const Wine = require('../models/WineModel');
const mongoose = require('mongoose');
const { getWineData } = require('../middleware/GetDealsData');
//getting the websiteList data
const theWebsitesListData = require('../middleware/websiteList.json');

//get the cellar with all the wines
const getDeals = async (req, res) => {
    //getting the id from changeable part of the route parameters
    const {id} = req.params
    //checking whether given id fits the mongodb/mongoose id standard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    //getting all wine deals & sorting them at discending order
    //const allWineDeals = await DealModel.find({ wineId: id }).sort({winePriceInShop: 1})
    const WineDealsWithPrice = await DealModel.find({ wineId: id, winePriceInShop: { $ne: "" } }).sort({winePriceInShop: 1});
    console.log('Wines with price: ' + WineDealsWithPrice)
    const WineDelasWithoutPrice = await DealModel.find({ wineId: id, winePriceInShop: ""});
    console.log('Wines WITHOUT price: ' + WineDelasWithoutPrice)
    const allWineDeals = WineDealsWithPrice.concat(WineDelasWithoutPrice);
    res.status(200).json(allWineDeals)
};

const createDeals = async (req, res) => {
    //getting the id from changeable part of the route parameters
    const {id} = req.params
    //checking whether given id fits the mongodb/mongoose id standard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Wine not found.'})
    }
    //getting Wine by id
    const chosenWine = await Wine.findById(id)
    const searchPhrase = chosenWine.name;
    const searchPhrase2 = chosenWine.type + ' ' + chosenWine.denomination;

    // --- --- --- ACTUALLY CREATING DEALS --- --- --- //
    //generating the data for each shop
    const websitesList = theWebsitesListData.websitesListData;
    let errors = [];
    for (i=0; i<websitesList.length; i++) {
        const websiteURL                = websitesList[i].websiteURL;
        const agreeSelector             = websitesList[i].agreeSelector;
        const additionalPopupSelector   = websitesList[i].additionalPopupSelector;
        const additionalPopupSelector2  = websitesList[i].additionalPopupSelector2;
        const searchSelector            = websitesList[i].searchSelector;
        const searchButton              = websitesList[i].searchButton;
        const pickFirst                 = websitesList[i].pickFirst;
        const nameSelector              = websitesList[i].nameSelector;
        const priceSelector             = websitesList[i].priceSelector;
        const wineShop                  = websitesList[i].wineShop


        // --- --- --- PART 01 - DEALS --- --- --- //
        //getting data by name - exact deals with searchPhrase
        const data                      = await getWineData(websiteURL, agreeSelector, additionalPopupSelector, additionalPopupSelector2, searchSelector, searchPhrase, searchButton, pickFirst, nameSelector, priceSelector, wineShop);
        
        //saving found wine data of given shop as a separate MongoDB document
        if (data.wineNameInShop && data.winePriceInShop) {
            try {
                await DealModel.create({
                    wineId:             id,
                    matchedBy:          "name",
                    available:          data.available,
                    shopName:           data.shopName,
                    wineURLInShop:      data.wineURLInShop,
                    wineNameInShop:     data.wineNameInShop,
                    winePriceInShop:    data.winePriceInShop
                });
                console.log('WineDeal added to DB.');
            } catch (error) {
                errors.push(error);
                console.log('error: ', error)
            }
        } else {
            try {
                await DealModel.create({
                    wineId:             id,
                    matchedBy:          "name",
                    available:          data.available,
                    shopName:           data.shopName,
                    wineURLInShop:      "Not found",
                    wineNameInShop:     "Not found",
                    winePriceInShop:    ""
                });
                console.log('WineDeal added to DB.');
            } catch (error) {
                errors.push(error);
                console.log('error: ', error)
            }
        }
        

    // --- --- --- PART 02 - RECOMMENDATIONS --- --- --- //
    
    //getting data by type/denomination - exact deals with searchPhrase2 (2!!! - not searchPhrase)
    const data_recommended          = await getWineData(websiteURL, agreeSelector, additionalPopupSelector, additionalPopupSelector2, searchSelector, searchPhrase2, searchButton, pickFirst, nameSelector, priceSelector, wineShop);
    
    //saving found wine data of given shop as a separate MongoDB document
    if (data_recommended.wineNameInShop && data_recommended.winePriceInShop) {
        try {
            await DealModel.create({
                wineId:             id,
                matchedBy:          "name",
                available:          data_recommended.available,
                shopName:           data_recommended.shopName,
                wineURLInShop:      data_recommended.wineURLInShop,
                wineNameInShop:     data_recommended.wineNameInShop,
                winePriceInShop:    data_recommended.winePriceInShop
            });
            console.log('WineDeal added to DB.');
        } catch (error) {
            errors.push(error);
            console.log('error: ', error)
        }
    } else {
        try {
            await DealModel.create({
                wineId:             id,
                matchedBy:          "similiarity",
                available:          data_recommended.available,
                shopName:           data_recommended.shopName,
                wineURLInShop:      "Not found",
                wineNameInShop:     "Not found",
                winePriceInShop:    ""
            });
            console.log('WineDeal added to DB.');
        } catch (error) {
            errors.push(error);
            console.log('error: ', error)
        }
    }
    
    }


    // --- --- --- FINAL ERRORS --- --- --- //
    //if this function returns only []
    if (!errors) {
        //getting all wine deals & sorting them at discending order
        const allWineDeals = await DealModel.find({ id }).sort({createdAt: -1})
        res.status(200).json(allWineDeals)
    } else {
        console.log(errors)
        res.status(500).json({errors: errors})
    }
    

};

//exporting functions
module.exports = {
    getDeals,
    createDeals
};