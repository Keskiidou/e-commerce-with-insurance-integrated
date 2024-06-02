const mongoose = require("mongoose")



const contractSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    price: {type: Number,required: true},
    description: {type: String, required: true},


    
 



}); 


const Contract = mongoose.model( "Contract",contractSchema);  


module.exports = Contract