const express = require("express");

const app = express(); // instance of express.js application

app.use("/user",(req, res)=>{
    res.send("hahahaha")
})
app.get("/user", (req, res) => {
  res.send({ firstName: "Mouli", lastName: "dharan" });
});

app.post("/user", (req, res) => {
  //saving data to DB
  console.log("Data sucessfully saved to database!!");
  res.send("Data sucessfully saved to database!!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully!!");
});
app.use("/test", (req, res) => {
  // request/response handler function
  res.send("Hello from the server!!");
});

app.listen(3000, () => {
  console.log("Server is successfull listening on port 3000...");
});
