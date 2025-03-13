const express = require("express");
const router = express.Router();
const countryDB = require("../models/country");
const stateDB = require("../models/state");
const cityDB = require("../models/city");
const categoryDB = require("../models/category");
const recipeDB = require("../models/recipe");

// Create a new recipe
router.post("/create", async (req, res) => {
  const { cityName, categoryName, recipeName, ingredients, makingProcess } =
    req.body;

  let categoryId = "";
  let cityId = "";

  // Checking city existance in database
  const cityExists = await cityDB.findOne({ cityName });
  if (!cityExists) {
    return res
      .status(400)
      .json({ success: false, message: "city does not exist!" });
  } else {
    cityId = cityExists._id;
  }

  // Checking category existance in database
  const categoryExists = await categoryDB.findOne({ categoryName });
  if (!categoryExists) {
    return res
      .status(400)
      .json({ success: false, message: "category does not exist!" });
  } else {
    categoryId = categoryExists._id;
  }

  // Check if recipe already exists in the database
  const recipeExists = await recipeDB.findOne({ recipeName });
  if (recipeExists) {
    return res
      .status(400)
      .json({ success: false, message: "recipe already exists!" });
  }

  const newRecipe = await recipeDB.create({
    recipeName,
    ingredients,
    makingProcess,
    city: cityId,
    categoryName: categoryId,
  });

  categoryExists.recipes.push(newRecipe._id);
  await categoryExists.save();

  cityExists.recipes.push(newRecipe._id);
  await cityExists.save();
});

// View all recipes
router.get("/recipes", async (req, res) => {
  const recipes = await recipeDB.find();
  res.json(recipes);
});

// View a recipe by recipe ID
router.get("/recipe/:id", async (req, res) => {
  const recipe = await recipeDB.findById(req.params.id);
  res.json(recipe);
});

// view all recipes of a city
router.get("/city/:id", async (req, res) => {
  const city = await cityDB.findById(req.params.id);
  if (!city) {
    return res
      .status(400)
      .json({ success: false, message: "city does not exist!" });
  }
  await city.populate("recipes");
  res.json(city.recipes);
});

// Update a recipe by recipe ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { recipeName, ingredients, makingProcess } = req.body;
  const updateRecipe = await recipeDB.findByIdAndUpdate(
    id,
    { $set: { recipeName, ingredients, makingProcess } },
    { new: true, runValidators: true }
  );
  res.json(updateRecipe);
});

// Delete a recipe by recipe ID
router.delete("/delete/:recipeId/:categoryId/:cityId", async (req, res) => {
  const { recipeId, categoryId, cityId } = req.params;

  const deleteRecipe = await recipeDB.findByIdAndDelete(recipeId);

  // check for category existance
  const categoryExists = await categoryDB.findById(categoryId);
  if (!categoryExists) {
    console.log("category not exist");
  } else {
    await categoryDB.updateOne(
      { _id: categoryExists._id },
      { $pull: { recipes: recipeId } }
    );
  }

  // check for city existance
  const cityExists = await cityDB.findById(cityId);
  if (!cityExists) {
    console.log("city not exist");
  } else {
    await cityDB.updateOne(
      { _id: cityExists._id },
      { $pull: { recipes: recipeId } }
    );
  }
});

module.exports = router;
