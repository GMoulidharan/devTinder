const expresss = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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

userRoute.get("/feed", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50: limit;
        const skip = (page - 1) * limit;
        //Find all connection request (sent + recieved)
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId") //.populate("fromUserId", "firstName").populate("toUserId", "firstName")

        
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        }) 
        
        //These are the users have to send back (users in the  field )
        const users = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.json({data: users})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
module.exports = userRoute;