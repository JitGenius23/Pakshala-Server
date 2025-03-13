const express = require("express");
const router = express.Router();
const categoryDB = require("../models/category");

// Create a new food item category
router.post("/create", async (req, res) => {
  const { categoryName } = req.body;

  const categoryNameExist = await categoryDB.findOne({categoryName});
  if(categoryNameExist){
    return res.status(400).json({success: false, message: 'category already exist!'});
  }

  const newCategory = await categoryDB.create({
    categoryName
  })
});

// View all category
router.get("/categories", async (req, res) => {
  const categories = await categoryDB.find();
  res.json(categories);
});

// Update a category by category ID

// Delete a category by category ID

module.exports = router;
