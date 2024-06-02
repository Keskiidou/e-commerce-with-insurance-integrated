const RegisterModel = require('../models/Register');
const bcrypt = require('bcryptjs');
const getUser = async (req , res) => {
    try {
        const userId = req.params.id 
        const user = await RegisterModel.findById(userId);
      res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { newName, newEmail, newPassword } = req.body; 
    const update = {};
    
    if (newName) update.name = newName;
    if (newEmail) update.email = newEmail;
    if (newPassword) { 
      const hashedPassword=await bcrypt.hash(newPassword, 10); 
      update.password = hashedPassword;
    } 
    const updatedUser = await RegisterModel.findByIdAndUpdate(userId, update, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.send(updatedUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  getUser,
  updateUser,
};