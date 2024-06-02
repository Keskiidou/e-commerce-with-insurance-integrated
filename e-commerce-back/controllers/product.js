// product.js (Controller)

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, imgID,stock } = req.body;
        const newProduct = new Product({ name, price, description, category, imgID ,stock});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a product', message: error.message });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for product', message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get products', message: error.message });
    }
};

const uploadImage = async (req, res) => {
    console.log('date now: ', Date.now());
    res.status(200).send('File uploaded successfully');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        id = req.query.id;
        const dir = `C:/Users/louay/OneDrive/Bureau/web-site-insurance-e-commerce-main/e-commerce/src/img/${id}/`;
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const type = req.query.type;
        const ext = path.extname(file.originalname);
        cb(null, 'image' + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (ext && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { name, price, category, description, imgID, stock } = req.body;
    try {
        const existingproduct = await Product.findById(id);

        const update = {};

        if (name) update.name = name;
        if (price) update.price = price;
        if (category) update.category = category;
        if (description) update.description = description;
        if (imgID) update.imgID = imgID;
        if (stock) update.stock = stock;

        const updatedProduct = await Product.findByIdAndUpdate(id, update, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the product", message: error.message });
    }
};

const getNumberOfProducts = async (req, res) => {
    try {
        const numberOfProducts = await Product.countDocuments();
        res.json({ numberOfProducts });
    } catch (error) {
        console.error('Error fetching number of products:', error);
        res.status(500).json({ error: 'Failed to fetch number of products' });
    }
};
const updateProductAndDecrementStock = async (req, res) => {
    const { id } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id, stock: { $gt: 0 } }, 
            { $inc: { stock: -1 } }, 
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found or out of stock." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};



module.exports = {
    createProduct,
    searchProduct,
    getAllProducts,
    uploadImage,
    upload,
    deleteProduct,
    updateProduct,
    getNumberOfProducts,
    updateProductAndDecrementStock
};
 