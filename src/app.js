const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")
const app = express(); // instance of express.js application

app.use(express.json());
app.use(cookieParser());
app.post("/signUp", async (req, res) => {
  try {
    validateSignUpdata(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    //Creating a new instance of a user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    
    const user =await User.findOne({ emailId: emailId });
    
    if (!user) {
      throw new Error("Invalid credentials"); 
    }

    const isValidPassword = await user.validatePassword(password)

    if (isValidPassword) {

      // Create a JWT token
      const token = await user.getJWT()
      
      //Add the token to cookie and send the response back to the user
      res.cookie("token", token,{
        expires: new Date(Date.now() + 8 * 3600000) 
      })
      res.send("Login sucessfull !!!")
    }
    else{
      throw new Error("Invalid credentials ")
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async(req, res)=>{
  try {

    const user =  req.user
    res.send(user);

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

app.post("/sendConnectionRequest",userAuth, async(req, res) =>{
  const user = req.user;

  console.log("sending connection request"); 

  res.send(user.firstName + "Sent the connection request") 
  
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
