const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const stateSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    stateName: {
        type: String,
        unique: true,
        required: true,
    },
    country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
    cities: [{type: mongoose.Schema.Types.ObjectId, ref: 'City'}],
})

 

module.exports = mongoose.model('State', stateSchema);