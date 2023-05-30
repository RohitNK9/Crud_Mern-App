const mongoose = require('mongoose');
const env = require('dotenv').config();
const DB = process.env.Database

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection Start")).catch((error)=>console.log(error.message));   