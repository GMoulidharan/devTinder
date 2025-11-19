const express = require("express");

const app = express(); // instance of express.js application


//this will match /user, /user/xyz, /user/1
app.use("/user/:userId/:name/:password",(req, res)=>{
    console.log(req.params);  
    res.send({ firstName: "Mouli", lastName: "dharan" })
})

app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
