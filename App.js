const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");
const DB = require("./config/mongoose-connection");
require('dotenv').config();

const mongoose = require("mongoose");

// Controllers Imports
const countriesController = require("./controllers/countries");
const statesController = require("./controllers/states");
const citiesController = require("./controllers/cities");
const categoriesController = require("./controllers/categories");
const recipesController = require("./controllers/recipes");
const statesCountController = require("./controllers/statsCount");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Controllers
app.use("/country", countriesController);
app.use("/state", statesController);
app.use("/city", citiesController);
app.use("/category", categoriesController);
app.use("/recipe", recipesController);
app.use("/stats", statesCountController);
// app.use("/country/states")

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(process.env.NODE_ENV);
});
