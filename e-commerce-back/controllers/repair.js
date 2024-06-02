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
const GetAllItemsRepairable = async (req, res) => {
    try {
        const ProductsToRepair = await Repair.find().populate({
            path: 'product',
            select: 'name'
        });
    
        const formattedProducts = ProductsToRepair.map(product => ({
            repairId: product._id, 
            productName: product.product.name,
            status: product.status
        }));
        
        res.json(formattedProducts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const EmailRepair = async (name, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reply to Your Message',
            html: `
            <p>Hello ${name},</p> 

            <p> We are pleased to inform you that we have successfully repaired your product.</p>
            
            <p>Best regards,</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Reply email sent to:', email);
    } catch (error) {
        console.error('Error sending reply email:', error);
    }
};
const markasRepaired = async (req, res) => {
    const repairId = req.params.id;
    try {
        const repair = await Repair.findById(repairId).populate({
            path: 'purchase',
            populate: {
                path: 'client',
                select: 'name email'
            }
        });

        if (!repair) {
            return res.status(400).json({ error: "There is no repair with this ID" });
        }

        const clientName = repair.purchase.client.name;
        const clientEmail = repair.purchase.client.email;

        
        await EmailRepair(clientName, clientEmail);

       
        repair.status = 'repaired';
        await repair.save();

        res.json({ clientName, clientEmail, status: 'repaired' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to mark repair as repaired and send email" });
    }
}
const NumberOfProductsToRepair = async (req, res) => {
    try {
        const numberOfProductsToRepair = await Repair.countDocuments();
        res.json({ numberOfProductsToRepair });
    } catch (error) {
        console.error('Error fetching number of products To Repair:', error);
        res.status(500).json({ error: 'Failed to fetch number of products To Repair' });
    }
};
module.exports = {
    GetAllItemsRepairable,
    markasRepaired,
    NumberOfProductsToRepair
}