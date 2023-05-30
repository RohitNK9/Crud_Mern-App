const express = require('express');
const userModel = require('../models/userSchema');


 //Register User 
const registerUser = async (req,res)=>{
    try {
        const {name,email,age,mobile,work,add,desc} = req.body;
        if(!name || !email || !age || !mobile || !work || !add || !desc){
            res.status(422).json({message:"Please Fill data"});
        }
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            res.status(422).json({message:"User already exists"});
        }else{
            const addUser = new userModel(); 
            addUser.name = req.body.name;
            addUser.email = req.body.email;
            addUser.age = req.body.age;
            addUser.mobile = req.body.mobile;
            addUser.work = req.body.work;
            addUser.add = req.body.add;
            addUser.desc = req.body.desc;
            const result = await addUser.save();
            res.status(200).json(result);
            console.log(result);
        }
    } catch (error) {
        res.status(422).json({message:error.message});
    }
}

//Get user information
const getUser = async (req, res) => {
    try {
        const result = await userModel.find();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(422).json({message:error.message});
    }
}

//Get user information by ID 
const getUserByID = async (req, res) => {
    try {
      const { id } = req.params; 
        const isValidObjectId = id;
      if (!isValidObjectId) {
        return res.status(422).json({ message: 'Invalid ID format' });
      } 
  
      const userIndividual = await userModel.findById({_id:id});
  
      if (!userIndividual) {
        return res.status(422).json({ message: 'User not found' });
      }
  
      console.log(userIndividual);
      res.status(200).json(userIndividual);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  };

  //Update user data
  const updateUser = async (req,res)=>{
    try {
        const { id } = req.params;  
        

      const user = await userModel.findByIdAndUpdate(id,req.body,{
        new:true,
      })
      const updateduser = await userModel.findById(id);
      console.log(updateduser);
      res.status(200).json(updateduser);

    } catch (error) {
        res.status(422).json({ message: error.message });
    }
  }

//Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  
     const user = await userModel.findByIdAndDelete({_id:id});
     res.status(200).json(user);
    } catch (error) {
        
    }
}


module.exports = {registerUser,getUser,getUserByID,updateUser,deleteUser} 