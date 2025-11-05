const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
// .env file se environment variables load karne ke liye
require('dotenv').config(); 

const app = express();
const port = 3001; // Frontend mein yahi port use hua hai

// Middleware
app.use(cors()); // CORS enable karein taaki frontend se requests accept ho sakein
app.use(express.json()); // Body-parser: JSON data ko parse karne ke liye

// Nodemailer Transporter Setup
// Yahan aapko apni email service ke credentials aur settings deni hongi.
const transporter = nodemailer.createTransport({
    // Example: For Gmail
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, // Environment variable se email uthaya
        pass: process.env.EMAIL_PASS, // Environment variable se password/App Password uthaya
    },
    // agar aap koi aur service use kar rahe hain to uske liye settings yahan aayengi
});

// Root route (optional, check server health)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Email service backend is running.' });
});

// POST endpoint to handle contact form submission
app.post('/send-email', async (req, res) => {
    const { fullName, email, message } = req.body;

    // Basic server-side validation
    if (!fullName || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields: Full Name, Email, or Message.' });
    }

    try {
        // Construct the email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // Kis email se bhej rahe hain
            to: process.env.RECEIVING_EMAIL, // Kis email par data bhejni hai (aapki email)
            subject: `New Contact Form Submission from ${fullName} (Portfolio)`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #007bff;">New Message Received</h2>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <hr style="border: 0; border-top: 1px solid #eee;">
                    <h3 style="color: #555;">Message:</h3>
                    <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
            // Reply-To header set karein taaki aap seedhe user ko reply kar sakein
            replyTo: email
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);

        // Success response
        res.status(200).json({ 
            message: 'Email sent successfully!',
            messageId: info.messageId 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        // Error response
        res.status(500).json({ 
            message: 'Failed to send email. Check server logs for details.',
            error: error.message 
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Contact Form Backend listening at http://localhost:${port}`);
    console.log(`Make sure to set EMAIL_USER, EMAIL_PASS, and RECEIVING_EMAIL in your .env file.`);
});
