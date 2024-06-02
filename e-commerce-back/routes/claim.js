const router = require('express').Router();
const { SendClaim,getallclaims,ViewcontractDetails,DeclineClaim,SendtoRepair,RepayClaim,getClaimStatus,getClaimNumbers } = require("../controllers/claim");


router.post("/sendclaim/:purchdId", SendClaim);
router.get("/getclaims",getallclaims);
router.get("/getdetails/:id",ViewcontractDetails);
router.put("/declineclaim/:id",DeclineClaim);
router.post("/sendtorepair/:id",SendtoRepair);
router.put("/repayclaim/:id",RepayClaim);
router.get("/getstatus/:userId",getClaimStatus);
router.get("/getnumberclaims",getClaimNumbers);



module.exports = router;
 