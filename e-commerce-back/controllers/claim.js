const Purchase = require('../models/purchase');
const Claim = require('../models/claim');
const Repair = require('../models/repairs');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "saeko.chan9@gmail.com",
        pass: "kdrn sznj dpco qupy",
    },
});
const SendClaim = async (req, res) => {
    const purchaseId = req.params.purchdId;
    const { issue, description } = req.body;
    try {
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json({ error: "Purchase not found" });
        }

        const newClaim = new Claim({ 
            purchase: purchase._id, 
            sender: purchase.client, 
            product: purchase.product, 
            contract: purchase.contract, 
            issue, 
            description
        });

        await newClaim.save();
        res.status(201).json(newClaim);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "An error occurred while submitting the claim" });
    }
};

const getallclaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate({
            path: 'sender',
            select: 'name'
        }).populate({
            path: 'product',
            select: 'name'
        });
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get claims' });
    }
}
const ViewcontractDetails = async (req, res) => {
    const claimId = req.params.id;
    try {
        const claim = await Claim.findById(claimId);
        if (!claim) {
            return res.status(400).json({ error: "There is no claim with this ID" });
        }

        const purchaseId = claim.purchase;
        const purchaseDetails = await Purchase.findById(purchaseId).populate('contract');

        if (!purchaseDetails) {
            return res.status(400).json({ error: "There is no purchase with this ID" });
        }

        const contractDetails = {
            name: purchaseDetails.contract.name,
            description: purchaseDetails.contract.description,
            vol: purchaseDetails.vol,
            endDate: purchaseDetails.end_date,
        };

        res.json(contractDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get Contract Details" });
    }
};


const EmailDeclineReply = async (name, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reply to Your Message',
            html: `
              <p>Hello ${name},</p> 
             
              <p>Thank you for submitting your claim. After a thorough review of the provided information and documentation, we regret to inform you that we are unable to approve your claim at this time.</p>
              <p>Best regards,</p>
             
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Reply email sent to:', email);
        
    } catch (error) {
        console.error('Error sending reply email:', error);
    }
};


const DeclineClaim = async (req, res) => {
    const { senderName } = req.body;
    const claimId = req.params.id;
    try {

        const claim = await Claim.findById(claimId).populate({
            path: 'sender',
            select: 'email'
        });


        if (!claim) {
            return res.status(400).json({ error: "There is no claim with this ID" });
        }

        await EmailDeclineReply(senderName, claim.sender.email);
        await Claim.findByIdAndUpdate(claimId, { $set: { claimStatus: 'Rejected' } });
        res.json({ clientEmail: claim.sender.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to decline claim and send email" });
    } 
}
const SendtoRepair = async (req, res) => {
    const claimId = req.params.id;
    try {

        const claim = await Claim.findById(claimId)

        if (!claim) {
            return res.status(400).json({ error: "There is no claim with this ID" });
        }
        const newrepair = new Repair({

            claim: claim._id,
            purchase: claim.purchase,
            product: claim.product,

        });



        await newrepair.save();
        await Claim.findByIdAndUpdate(claimId, { $set: { claimStatus: 'Sent To Repair' } });
        return res.status(201).json({ message: "product sent to be repaired" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const EmailRepayReply = async (name, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reply to Your Message',
            html: `
              <p>Hello ${name},</p> 
             
              <p><strong>Thank you for bringing the matter to our attention. Following a comprehensive assessment of the information and documentation provided, we acknowledge responsibility for the issue stemming from our product.</strong></p>
              <p><strong>Rest assured, we are committed to rectifying this situation promptly. We will initiate the repayment process accordingly.</strong></p>
              <p>Best regards,</p>
              
             
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Reply email sent to:', email);
    } catch (error) {
        console.error('Error sending reply email:', error);
    }
};


const RepayClaim = async (req, res) => {
    const { senderName } = req.body;
    const claimId = req.params.id;
    try {

        const claim = await Claim.findById(claimId).populate({
            path: 'sender',
            select: 'email'
        });


        if (!claim) {
            return res.status(400).json({ error: "There is no claim with this ID" });
        }

        await EmailRepayReply(senderName, claim.sender.email);
        await Claim.findByIdAndUpdate(claimId, { $set: { claimStatus: 'Repayed' } });
        res.json({ clientEmail: claim.sender.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to repay claim and send email" });
    }
}
const getClaimStatus = async (req, res) => {
    try {
        const userId = req.params.userId;

        const purchases = await Purchase.find({ client: userId });

        const productStatus = {};

        for (const purchase of purchases) {
            if (purchase) { // Check if purchase is not null
                const claims = await Claim.find({ purchase: purchase._id }).populate('product');

                if (claims.length > 0) {
                    for (const claim of claims) {
                        if (claim.product && claim.product._id) { // Check if claim.product is not null and claim.product._id is present
                            productStatus[claim.product._id] = claim.claimStatus;
                        }
                    }
                } else {
                    productStatus[purchase.product] = 'No Claim';
                }
            }
        }

        return res.status(200).json(productStatus);
    } catch (error) {
        console.error('Error fetching claim status:', error);
        return res.status(500).json({ error: 'Failed to fetch claim status' });
    }
};

  
const getClaimNumbers = async (req, res) => {
    try {
        const numberOfClaims = await Claim.countDocuments(); 
        res.json({ numberOfClaims }); 
    } catch (error) {
        console.error('Error fetching number of claims:', error);
        res.status(500).json({ error: 'Failed to fetch number of claims' }); 
    }
};


module.exports = {
    SendClaim,
    getallclaims,
    ViewcontractDetails,
    DeclineClaim,
    SendtoRepair,
    RepayClaim,
    getClaimStatus, 
    getClaimNumbers,

}
