const router = require('express').Router()
const {sendmessage,getmessages,deletemessage,SendReplyMessage}=require("../controllers/messages");


router.post("/contact", sendmessage);
router.get ("/invoices/:id",getmessages);
router.delete("/invoices/:id",deletemessage)
router.post("/invoices",SendReplyMessage)

module.exports = router; 