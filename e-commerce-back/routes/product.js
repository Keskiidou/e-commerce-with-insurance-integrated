


const router = require('express').Router()

const {createProduct,searchProduct,getAllProducts,uploadImage,upload, deleteProduct, updateProduct,getNumberOfProducts,updateProductAndDecrementStock} = require("../controllers/product")




router.post("/createProduct", createProduct)
router.get("/search/:id",searchProduct)
router.get("/allproducts", getAllProducts);
router.post('/upload', upload.single('imageFile'),uploadImage);
router.delete('/deleteProduct/:id',deleteProduct);
router.put('/updateProduct/:id',updateProduct);
router.get('/getnumberproducts',getNumberOfProducts);
router.patch('/updateStock',updateProductAndDecrementStock);
 

module.exports=router; 