const express = require("express");

const app = express(); // instance of express.js application

// app.use("/route", rH, rH2, rH3, rH4)
// app.use("/route", [rH, rH2], rH3, rH4)
// app.use("/route", rH, [rH2, rH3], rH4)
app.use(
    "/user",
    (req, res, next) =>{
       console.log("Handling the route user!!");
      //  res.send("Response!!")
      next();
      
    },
    (req, res, next) =>{
       console.log("Handling the route user2!!");
      //  res.send("2nd Response!!");
       next();
    },
    (req, res, next) =>{
       console.log("Handling the route user3!!");
      //  res.send("2nd Response!!");
       next();
    },
    (req, res, next) =>{
       console.log("Handling the route user4!!");
       res.send("2nd Response!!");
      //  next();
    }
)

app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
