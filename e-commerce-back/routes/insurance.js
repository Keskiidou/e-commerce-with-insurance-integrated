


const router = require('express').Router()

const {createInsurance,getAllInsurances} = require("../controllers/insurance")




router.post("/createInsurance", createInsurance)
router.get("/allinsurances", getAllInsurances);


module.exports=router; 