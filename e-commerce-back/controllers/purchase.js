
const Purchase = require('../models/purchase');

const createPurchase = async (req, res) => {
    try {
        const { client, product, contract, vol, end_date,creditCard } = req.body;
        const newPurchase = new Purchase({ client, product, contract, vol, end_date,creditCard });
        await newPurchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a purchase', message: error.message });
    }
};
const getpurchasedProduct = async (req, res) => {
    const userId = req.params.userid;
    try {
        const products = await Purchase.find({ client: userId }).populate({
            path: 'product',
            select: 'name price description imgID' 
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching purchased products', message: error.message });
    }
};

// const getAllInsurances = async (req, res) => {
//     try {
//         const Insurances = await Insurance.find();
//         res.status(200).json(Insurances);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to get Insurances', message: error.message });
//     }
// };
module.exports = {
    createPurchase,
    getpurchasedProduct
    // getAllInsurances,
};