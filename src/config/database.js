
const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://moulidharansrv_db_user:jHpfmlt8vzM1bE3q@node.lwcttun.mongodb.net/")
}

module.exports = connectDB;