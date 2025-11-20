const express = require("express");

const app = express(); // instance of express.js application


// app.use( "/user",(req, res, next) =>{
//        console.log("Handling the route user!!");
//       //  res.send("Response!!")
//       next();
//     }, 
// )
// app.use( "/user",(req, res, next) =>{
//        console.log("Handling the route user!!");
//        res.send("Independent 2nd route handler!!")
      
//     }, 
// )

app.use( "/",(req, res, next) =>{
       console.log("Handling the route(Middle ware)!!");
      //  res.send("Response!!")
      next();
    }, 
)
app.get( "/user",
   (req, res, next) =>{
       console.log("Handling the route /user (Middle ware)!!");
      //  res.send("Response!!")
      next();
    }, 
    (req, res, next) =>{
      next();
    },
    (req, res) =>{
      res.send("Finally reached route handler")
    },
)

app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
