const models = require('../models'); 
const bcrypt = require('bcryptjs');
const generateToken = require('../utilis'); // Ensure the path to the generateToken utility is correct
const nodemailer = require('nodemailer');

const GetUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await models.User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const CheckPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await models.User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const authenticate = async (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}! This is protected data.` });
}

const resetPass = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await models.User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = Math.random().toString(36).slice(-8);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3000000; // 10 minutes

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "raj0105200@gmail.com",
                pass: "ikxt mrbs fumf pjfo"
            }
        });

        const message = {
            from: 'raj0105200@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Your password reset token is ${token}. Please click on this link to reset your password: http://localhost:3000/reset/${token}`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) return res.status(500).json({ message: 'Failed to send email' });
            res.status(200).json({ message: 'Email sent successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const resetPassToken = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find the user by the reset password token and check if the token has not expired
        const user = await models.User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token expired or invalid' });
        }

        // Update the user’s password and clear reset token fields
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    GetUser,
    CheckPassword,
    authenticate,
    resetPass,
    resetPassToken
}
