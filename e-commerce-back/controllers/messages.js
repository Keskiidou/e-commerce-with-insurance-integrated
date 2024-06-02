const RegisterModel = require('../models/Register');
const MessageModel = require('../models/messages');
const AdminModel = require('../models/Admins')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "saeko.chan9@gmail.com",
    pass: "kdrn sznj dpco qupy",
  },
});
const sendmessage = async (req, res) => {
  const { email, selectedValue, message } = req.body;
  try {

    const sender = await RegisterModel.findOne({ email: email });
    if (!sender) {
      return res.status(400).json({ error: "No user found with this email", email });

    }
    const newMessage = new MessageModel({
      sender: sender._id,
      receiver: selectedValue,
      message: message,
      timestamp: new Date()
    });


    await newMessage.save();

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getmessages = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const messages = await MessageModel.find({ receiver: admin.role }).populate('sender', 'name email');
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No messages found for admin with role: " + admin.name });
    } else {
      res.json(messages);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
const deletemessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const deletedmessage = await MessageModel.findByIdAndDelete(messageId);
    if (!deletedmessage) {
      return res.json('message not found.');
    }
    return res.json('message deleted successfully:');
  } catch (error) {
    console.error('Error message User:', error);
    return res.status(500).json('Error deleting message.');
  }

}
const EmailReply = async (name, email, replymessage) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email, 
      subject: 'Reply to Your Message',
      html: `
            <p>Hello ${name},</p> 
            <p>You have received a reply to your message:</p>
            <p>${replymessage}</p>
            <p>Best regards,</p>
           
        `
    };

    await transporter.sendMail(mailOptions);
    console.log('Reply email sent to:', email);
  } catch (error) {
    console.error('Error sending reply email:', error);
  }
};
const SendReplyMessage = async (req, res) => {
  try {
    const {message,email,name}= req.body;
    await EmailReply(name,email,message);
    res.status(200).json({ message: "Reply message sent successfully" });
  } catch (error) {
    console.error('Error sending reply message:', error);
    res.status(500).json({ message: "Failed to send the reply message" });
  }
};




module.exports = {
  sendmessage,
  getmessages,
  deletemessage,
  SendReplyMessage
}
