const validator = require("validator")
const validateSignUpdata= (req) =>{
    const{firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Please enter Valid name")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please enter Valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong passwpord")
    }
}

const validateEditProfileData = (req) =>{
    const allowedEditFields =[
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ]

    const isEditAllowed = Object.keys(req.body).every((fields) => allowedEditFields.includes(fields))
    
    return isEditAllowed;
}
module.exports={
    validateSignUpdata,
    validateEditProfileData
}