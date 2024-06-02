


const router = require('express').Router()

const {createContract,getAllContracts, deleteContract, updateContract,getnumberOfContract} = require("../controllers/contract")




router.post("/createContract", createContract)
router.get("/allcontracts", getAllContracts);
router.delete("/deleteContract/:id",deleteContract);
router.put("/updateContract/:id",updateContract);
router.get("/getnumbercontract",getnumberOfContract);

module.exports=router; 