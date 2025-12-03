const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");


profileRouter.get("/profile/view", userAuth, async(req, res)=>{
  try {

    const user =  req.user
    res.send(user);

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit request")
    }
    const loggedInUser = req.user;
    
    Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile updated successfully`, 
      data :loggedInUser
    })
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
});

// profileRouter.patch("/profile/password", userAuth, async(req, res)=>{
  
//   try{
//     const user = req.user
//     const {oldPassword, newPassword} = req.body;

//     if(!oldPassword || !newPassword){
//       throw new Error("Both old Password and new password is required")
//     }

//     const isPasswordMatching = await user.validatePassword(oldPassword);
//     if(!isPasswordMatching){
//       throw new Error("Old password is Incorrect")
//     }
    
//     if(oldPassword === newPassword){
//       throw new Error("New password must be diiferent from old password")
//     }

//     user.password = newPassword;
//     user.save();

//     res.json({message:"Password updated successfully"})
//   }catch(err){
//     res.status(400).send("ERROR: " + err.message);
//   }
// })

module.exports = profileRouter