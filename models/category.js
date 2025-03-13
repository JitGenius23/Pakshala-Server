const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const categorySchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    categoryName: {
        type: String,
        unique: true,
        required: true,
    },
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
})

module.exports = mongoose.model('Category', categorySchema);