
const Insurance = require('../models/insurance');

const createInsurance = async (req, res) => {
    try {
        const { name , price, description , start_date, end_date , contract} = req.body;
        const newInsurance = new Insurance({ name, price, description,start_date, end_date,contract});
        await newInsurance.save();
        res.status(201).json(newInsurance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a insurance', message: error.message });
    }
};


const getAllInsurances = async (req, res) => {
    try {
        const Insurances = await Insurance.find();
        res.status(200).json(Insurances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Insurances', message: error.message });
    }
};
module.exports = {
    createInsurance,
    getAllInsurances,
};