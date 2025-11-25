const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express(); // instance of express.js application

app.post("/signUp",async(req, res)=>{
   const userObj ={
      firstName:"Virat",
      lastName:"Kholi",
      emailId:"Virat@Kholi.com",
      password:"Virat@123"
   }

   const user = new User(userObj);
   try{
      await user.save();
   res.send("User added Successfully")
   }catch(err){
      res.status(400).send("Error saving the User: " + err.message);
   }
   
})


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfull listening on port 3000...");
    });
  })
  .catch(() => {
    console.error("Database cannot be connected");
  });
