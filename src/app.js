const express = require("express");

const app = express(); // instance of express.js application

const {adminAuth, userAuth} = require("./middlewares/auth")

//handle auth Middleware for all request GET POST... requests,
app.use("/admin", adminAuth);
// app.use("/admin", userAuth);

app.get("/user/login", userAuth, (req, res) => {
  res.send("User logged in successfully"); 
});

app.get("/user", userAuth, (req, res) => {
  res.send("User data send"); 
});

app.get("/admin/getAlData", (req, res) => {
  //Logic of chekingAfter getting the API call check if the req is authorized(actually made by an admin)
  res.send("All data send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the user");
});



app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
