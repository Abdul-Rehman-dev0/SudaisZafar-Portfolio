const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Test Route
app.get('/', (req, res) => {
    res.json({ message: "Backend is running ✅" });
});

// ✅ Contact Form Route
app.post('/send-email', async (req, res) => {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVING_EMAIL,
            subject: `New Contact Form Submission from ${fullName}`,
            html: `
                <h2>New Message Received</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
            replyTo: email,
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Email sent successfully ✅",
            id: info.messageId,
        });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({
            message: "Email sending failed ❌",
            error: error.message,
        });
    }
});

// ✅ THIS IS IMPORTANT FOR VERCEL
module.exports = app;
