const expresss = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRoute = expresss.Router();

//Get all the pending connection request for the logged in user
userRoute.get("/user/requests/recieved",userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate(
            "fromUserId",
            "firstName lastName photoUrl age gender about skills"
        )
        // }).populate("fromUserId", ["firstName", "lastName"])
        res.json({
            message: "Data fetched successfully",
            data: connectionRequests
        })
    }catch(err){
        req.statusCode(400).send("ERROR: "+  err.message)
    }

})


module.exports = userRoute;