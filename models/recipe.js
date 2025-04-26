const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const recipeSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  recipeName: {
    type: String,
    unique: true,
    required: true,
  },
  ingredients: { type: [String], required: true }, // List of ingredients
  makingProcess: { type: String, required: true }, // Step-by-step cooking process
  images: [{type: String, required: true}], // URL to the recipe image
  categoryName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",  
    required: true,
  }, // Item belongs to one category
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true }, // Item belongs to one city
});

module.exports = mongoose.model("Recipe", recipeSchema);
