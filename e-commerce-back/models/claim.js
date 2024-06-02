const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
    issue: {
        type: String,
        required: true,
        enum: ["Stolen", "Malfunctioning", "Damaged"],
    },
    description: { type: String, required: true },
    claimStatus: {
        type: String,
        enum: ['In Treatment', 'Rejected', 'Repayed', 'Sent To Repair'],
        default: 'In Treatment'
    }
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
