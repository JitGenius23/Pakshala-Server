const express = require("express");
const router = express.Router();
const countryDB = require("../models/country");
const stateDB = require("../models/state");
const cityDB = require("../models/city");
const categoryDB = require("../models/category");
const recipeDB = require("../models/recipe");

router.get("/stats", async (req, res) =>{
    const countryCount = await countryDB.countDocuments();
    const stateCount = await stateDB.countDocuments();
    const cityCount = await cityDB.countDocuments();
    const categoryCount = await categoryDB.countDocuments();
    const recipeCount = await recipeDB.countDocuments();
    res.json({countryCount, stateCount, cityCount, categoryCount, recipeCount});
})

module.exports = router;