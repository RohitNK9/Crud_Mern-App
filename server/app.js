const express = require('express');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
require("./db/conn");
const users = require("./models/userSchema") 
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log('sever is running on port '+process.env.PORT); 
}) 

app.use(router); 