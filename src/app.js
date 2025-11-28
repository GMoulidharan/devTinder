const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt")
const app = express(); // instance of express.js application

app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    validateSignUpdata(req);
    
    const { firstName, lastName, emailId, password } = req.body;
    
    const passwordHash = await bcrypt.hash(password, 10);

    //Creating a new instance of a user model
    const user = new User({firstName, lastName, emailId, password:passwordHash});

    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Get user by email

app.get("/user", async (req, res) => {
  const userId = req.body._id;
  const userEmail = req.body.emailId;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(404).send("Usernot found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
  // try{
  //   const user = await User.find({emailId: userEmail});
  //   if(user.length === 0){
  //     res.status(404).send("Usernot found")
  //   }
  //   else{
  //     res.send(user);
  //   }
  // }catch(err){
  //   res.status(404).send("Something went wrong")
  // }
});
//Feed API - GET /feed -get all the users from the DB

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//delete a user from a database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//Update data of the user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOEWD_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOEWD_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 5) {
      throw new Error("Skills cannot exceed 5");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: "true",
    });
    console.log(user); // before log older of the document, default is before

    res.send("User Updated successfully");
  } catch (err) {
    res.status(404).send("Updated failed: " + err.message);
  }
});
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
