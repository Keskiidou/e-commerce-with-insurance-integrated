const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name :String,
    email:String,
    password :String,
    emailVerified: { type: Boolean, default: false },
    verificationToken:String,
    
});
const RegisterModel = mongoose.model("clients",RegisterSchema)
module.exports = RegisterModel ;