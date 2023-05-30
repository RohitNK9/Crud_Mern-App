const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");

router.post('/register',userController.registerUser); // register user
router.get('/getdata',userController.getUser); // get user
router.get('/getuser/:id',userController.getUserByID); // get user by id 
router.patch('/updateuser/:id',userController.updateUser); // update user
router.delete('/deleteuser/:id',userController.deleteUser); // delete user
module.exports = router