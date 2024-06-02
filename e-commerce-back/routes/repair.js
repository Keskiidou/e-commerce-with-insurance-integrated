const router = require('express').Router();

const {GetAllItemsRepairable,markasRepaired,NumberOfProductsToRepair} = require("../controllers/repair");

router.get("/getallrepairs",GetAllItemsRepairable);
router.post("/itemrepaired/:id",markasRepaired);
router.get("/getNumberOfProductsToRepair",NumberOfProductsToRepair);

module.exports = router;