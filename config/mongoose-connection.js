const mongoose = require("mongoose");
const config = require("config");
// const dbgr = require("debug")("development: mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/pakshala`)
.then(function(){
    console.log("DB Connected");
    // dbgr("DB Connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;


// "mongodb://localhost:27017/pakshala" This is not the production ready connection
// Change the connection string for production further