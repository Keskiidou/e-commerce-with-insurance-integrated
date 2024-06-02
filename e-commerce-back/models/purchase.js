const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract'},

    vol: { type: Boolean},
    end_date: { type: String },
    creditCard: { type: String },
   
    
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
  