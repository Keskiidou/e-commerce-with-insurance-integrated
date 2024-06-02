const RegisterModel = require('../models/Register');
const bcrypt = require('bcryptjs');
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

const register = async (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await RegisterModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "Email is already registered" });
        }


        const verificationToken = jwt.sign({ email: email }, 'your_secret_key', { expiresIn: '1h' });

 
        await sendVerificationEmail(name, email, verificationToken);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new RegisterModel({ name, email, password: hashedPassword, verificationToken });
        await newUser.save();
        return res.json("signup successful");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendVerificationEmail = async (name, email, token) => {
    try {
        const verificationLink = `${process.env.CLIENT_URL}/email_verify?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Verify your email',
            html: `
                <p>Hello ${name},</p> 
                <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
                <a href="${verificationLink}">${verificationLink}</a>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

const email_verify = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await RegisterModel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ error: "User not found or invalid token" });
        }


        user.emailVerified = true;
        await user.save();

        console.log("Email verification successful.");


        return res.json({ message: "Email verification successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await RegisterModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, "kdrn sznj dpco qupy", { expiresIn: '1h' });


        return res.json({ message: "Login successful", userId: user._id, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const sendResetPasswordEmail = async (name, email, _id) => {
    try {
        const verificationLink = `${process.env.CLIENT_URL}/Resetyoupassword?id=${_id}`;

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'reset your password ',
            html: `
                <p>Hello ${name},</p> 
                <p>click the link below to rest you password :</p>
                <a href="${verificationLink}">${verificationLink}</a>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await RegisterModel.findOne({ email: email });
        if (!user) {
            return res.json("There is no account associated with this email");
        }
        const userId = user._id;
        const name = user.name;

        await sendResetPasswordEmail(name, email, userId);
        return res.json("check your email");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const resetpassword = async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const repeatnewPassword = req.body.repeatnewPassword;
        const userId = req.params.id;

        const user = await RegisterModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found or invalid token" });
        }

        if(newPassword===repeatnewPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        console.log("Password reset successful.");

        return res.json({ message: "Password reset successful" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    login,
    register,
    email_verify,
    forgotpassword,
    resetpassword,
};