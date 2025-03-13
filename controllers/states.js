const express = require("express");
const router = express.Router();
const stateDB = require("../models/state");
const countryDb = require("../models/country");
 

// create a new state
router.post("/create", async (req, res) => {
  const { stateName, country } = req.body;

  let countryID = "";


  const countryExists = await countryDb.findOne({ countryName: country });
  if (!countryExists) {
    return res
      .status(400)
      .json({ success: false, message: "Country does not exist!" });
  } else {
    countryID = countryExists._id;
  }

 

   // Check if state already exists in the database
   const stateExists = await stateDB.findOne({ stateName });
   if (stateExists) {
     return res.status(400).json({ success: false, message: "State already exists!" });
   }

  // console.log(countryExists._id);

  const newState = await stateDB.create({
    stateName,
    country: countryID,
  });

   // Add the new state's ID to the country's states array
   countryExists.states.push(newState._id);
   await countryExists.save(); // Save the updated country document

  // console.log(newState);
});

// get all states
router.get("/states", async (req, res) => {
  const states = await stateDB.find();
  res.json(states);
});

// update a state
router.put("/update/:id", async (req, res) => {});

module.exports = router;
