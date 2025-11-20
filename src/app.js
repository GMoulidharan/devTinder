const express = require("express");

const app = express(); // instance of express.js application



app.get("/getuserdata", (req, res) => {
   try{
      throw new Error("ncondcnds");
      res.send("User data send");
   }catch(err){
      res.status(500).send("Some Error contact suport team!!")
   }
   res.send("User data send");
   
});

// app.use("/",(err, req, res, next)=>{
//    if(err){
//       res.status(500).send("Something went wrong!!")
//    }
// })



app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
