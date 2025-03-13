const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const citySchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    cityName: {
        type: String,
        unique: true,
        required: true,
    },
    states: {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
})

module.exports = mongoose.model('City', citySchema);