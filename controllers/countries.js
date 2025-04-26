const express = require("express");
const countryDB = require("../models/country");
const router = express.Router();

// Create a New Country
if(process.env.NODE_ENV === 'development'){
router.post("/create", async (req, res) => {
  try {
    const { countryName } = req.body;
    const newCountry = await countryDB.create({
      countryName,
    });
    res.status(201).json({ success: true, data: newCountry });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Country already exists!" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get All Countries
router.get("/countries", async (req, res) => {
  const countries = await countryDB.find({}, { countryName: 1, ID: 1 });
  res.json(countries);
});

// Delete a Country
router.get("app/country/:id", () => {});
}

module.exports = router;
