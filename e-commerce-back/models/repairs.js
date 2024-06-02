const mongoose = require("mongoose")



const repairSchema = new mongoose.Schema({
    purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true },
    claim: { type: mongoose.Schema.Types.ObjectId, ref: 'Claim', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    status: { type: String, default: 'not repaired', required: true },

}); 


const Repair = mongoose.model( "repairs",repairSchema);  


module.exports = Repair;