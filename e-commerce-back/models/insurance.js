const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true }
});

const Insurance = mongoose.model("Insurance", insuranceSchema);

module.exports = Insurance;
