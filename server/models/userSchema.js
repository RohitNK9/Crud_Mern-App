const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    age:{
        type: 'number',
        required: true
    },
    mobile:{
        type: 'number',
        required: true
    },
    work:{
        type: 'string',
        required: true
    },
    add:{
        type: 'string',
        required: true
    },
    desc:{
        type: 'string',
        required: true
    }
});

const users = new mongoose.model("users",userSchema);
module.exports=users;