const express = require('express');

const app = express(); // instance of express.js application

app.use("/",(req, res)=>{ // request/response handler function
    res.send("Hello from the Dashboard!")
})
app.use("/hello",(req, res)=>{ // request/response handler function
    res.send("Hello hello hello!!")
})

app.use("/test",(req, res)=>{ // request/response handler function
    res.send("Hello from the server!!")
})

app.listen(3000, () =>{
    console.log("Server is successfull listening on port 3000...");
});
