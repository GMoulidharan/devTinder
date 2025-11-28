const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minLength: 3,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowerCase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Invalid email address" + value) 
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password" + value)
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        //Custom validation function- called only for a new user added not work for Patch by default
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLn2vN-qAufnhM8t2e4OkZ6-m3Md6_Gk9B7g&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL" + value)
            }
        }
    },
    about:{
        type:String,
        default:"This is the default about of the user!!"
    },
    skills:{
        type:[String],
    }
    },
    {
        timestamps:true
    }
);

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Dev@Tinder$567",{expiresIn: "1d"})

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isValidPassword;
}

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);