
const AdminModel =require('../models/Admins')
const RegisterModel = require('../models/Register');
const getAdmins = async (req, res) => {
  try {
    
    const admins = await AdminModel.find();

    
    const filteredAdmins = admins.filter(admin => admin.role !== "Warden_admin");

   
    res.json(filteredAdmins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getUsers = async (req, res) => {
  try {
    
    const users = await RegisterModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = {
  getAdmins,
  getUsers,
};