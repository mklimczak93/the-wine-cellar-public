const mongoose = require('mongoose');

//creating schemas
const Schema = mongoose.Schema;

//creating schema for wine
const dealSchema = new Schema(
    {
        wineId:             { type: String, required: true },
        matchedBy:          { type: String, required: true },
        available:          { type: Boolean, required: true },
        shopName:           { type: String, required: true },
        wineURLInShop:      { type: String },
        wineNameInShop:     { type: String },
        winePriceInShop:    { type: String }
    },
    //creating timestamps for object creation & update
    {timestamps: true}
);

//creating a model from schema
module.exports = mongoose.model('Deal', dealSchema);