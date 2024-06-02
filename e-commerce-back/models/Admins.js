const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name :String,
    lastName: String,
    email:String,
    contact:Number,
    password :String,
    role: {
        type: String,
        enum: ["Warden_admin","Shop_admin", "Insurance_admin", "Repair_admin"],
    }
});
const AdminModel = mongoose.model("Admins",AdminSchema)
module.exports = AdminModel ;