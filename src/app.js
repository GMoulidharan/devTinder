const express = require("express");
const connectDB = require("./config/database");


const cookieParser = require("cookie-parser");
const app = express(); // instance of express.js application

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
