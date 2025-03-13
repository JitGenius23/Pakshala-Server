const mongoose = require("mongoose");
const uuidv4 = require('uuid').v4;

const countrySchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  countryName: {
    type: String,
    required: true,
    unique: true
  },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }],
});

module.exports = mongoose.model("Country", countrySchema);
