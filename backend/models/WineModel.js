const mongoose = require('mongoose');

//creating schemas
const Schema = mongoose.Schema;

//creating schema for wine
const wineSchema = new Schema(
    {
        name:           { type: String, required: true },
        wineType:       { type: String, required: true },
        sweatness:      { type: String, required: true },
        denomination:   { type: String },
        grape:          { type: String },
        origin:         { type: String, required: true },
        year:           { type: Number, min: 1800, required: true },
        notes:          { type : Array, default : [] },
        pairing:        { type : Array, default : [] },
        userId:         { type: String, required: true },
        imagePath:      { type: String }
    },
    //creating timestamps for object creation & update
    {timestamps: true}
);

//creating a model from schema
module.exports = mongoose.model('Wine', wineSchema);