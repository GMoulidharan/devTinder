const expresss = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRoute = expresss.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"
//Get all the pending connection request for the logged in user
userRoute.get("/user/requests/recieved",userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate(
            "fromUserId",
            USER_SAFE_DATA
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

userRoute.get("/user/connections", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser, status:"accepted"},
                {toUserId: loggedInUser, status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)  
        
        const data = connectionRequest.map((row) =>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId
        })
        res.json({data})
    }catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
})
module.exports = userRoute;