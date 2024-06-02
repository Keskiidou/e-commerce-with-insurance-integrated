const path = require('path');
const Contract = require('../models/contract');

const createContract = async (req, res) => {
    try {
        const { name, price, description} = req.body;
        const newContract = new Contract({ name, price, description});
        await newContract.save();
        res.status(201).json(newContract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a contract', message: error.message });
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.status(200).json(contracts); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Contracts', message: error.message });
    }
};

const updateContract = async (req, res) => {
    
    const { id } = req.params;
    const { name, price,  description } = req.body;
    try {
        const existingcontract = await Contract.findById(id);
    
    const update =  {};
    
    if (name) update.name = name;
    if (price) update.price = price; 
    if (description) update.description = description;

    const updatedContract = await Contract.findByIdAndUpdate(id, update , { new : true  });

    if (!updatedContract) {
        return res.status(404).json({ message: "Contract not found." });
    }

    res.status(200).json(updatedContract);
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error });
}
};
const deleteContract = async (req, res) => {
try {
  const contractId = req.params.id;
  const deletedContract= await Contract.findByIdAndDelete(contractId);
  if (!deletedContract) {
    return res.status(404).json({ error: "Contract not found" });
  }
  res.json({ message: "Contract deleted successfully", deletedContract });
} catch (error) {
  res.status(500).json({ error: "Failed to delete the product", message: error.message });
}
};
const getnumberOfContract =async (req,res) =>{
    try {
        const numberOfContract = await Contract.countDocuments(); 
        res.json({ numberOfContract }); 
    } catch (error) {
        console.error('Error fetching number of contract:', error);
        res.status(500).json({ error: 'Failed to fetch number of contract' }); 
    }
}




module.exports = {
    createContract,
    getAllContracts,
    deleteContract,
    updateContract,
    getnumberOfContract
};
