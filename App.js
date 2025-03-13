const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const mongoose = require('mongoose');

// Controllers Imports
const countriesController = require('./controllers/countries');
const statesController = require('./controllers/states');
const citiesController = require('./controllers/cities');
const categoriesController = require('./controllers/categories');
const recipesController = require('./controllers/recipes');
const statsCountController = require('./controllers/statsCount');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// Controllers
app.use("/country", countriesController);
app.use("/state", statesController);
app.use("/city", citiesController);
app.use("/category", categoriesController);
app.use("/recipe", recipesController);
app.use("/stats", statsCountController);
// app.use("/country/states")
 


mongoose.connect('mongodb://localhost:27017/pakshala');

// mongoose.connect('mongodb://localhost:27017/pakshala', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})