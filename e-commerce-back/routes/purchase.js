


const router = require('express').Router()

const {createPurchase,getpurchasedProduct} = require("../controllers/purchase")




router.post("/createPurchase", createPurchase)
router.get("/history/:userid",getpurchasedProduct);



module.exports=router; 