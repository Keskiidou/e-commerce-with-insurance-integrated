const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients', 
    required: true
  },
  receiver:String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model('messages', MessageSchema);
module.exports = MessageModel;
