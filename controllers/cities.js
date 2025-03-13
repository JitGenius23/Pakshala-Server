const express = require("express");
const router = express.Router()
const cityDB = require("../models/city");
const stateDB = require("../models/state");

// Create A New City
router.post("/create", async (req, res)=>{
    const {cityName, stateName} = req.body;

    let stateID = '';

    const stateExists = await stateDB.findOne({stateName});
    if(!stateExists){
        return res.status(400).json({success: false, message:'state does not exists!'})
    } else {
        stateID = stateExists._id;
    }

    const cityExists = await cityDB.findOne({cityName});
    if(cityExists){
        return res.status(400).json({success: false, message: 'city already exists'})
    }

    const newCity = await cityDB.create({
        cityName, 
        stateName: stateID
    })

    stateExists.cities.push(newCity._id);
    await stateExists.save();
    
})

// Get All Cities
router.get('/cities', async (req, res)=>{
    const cities = await cityDB.find();
    res.json(cities);
})

// Update City By ID

// Delete City By ID

module.exports = router;