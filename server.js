require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // xyz@gmail.com
    pass: process.env.EMAIL_PASS, // 1234 (or your app password)
  },
});

// Email Sending Route
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body; // Extract form data from request

  // Email to the user
  const userMailOptions = {
    from: process.env.EMAIL_USER, // xyz@gmail.com
    to: email, // abc@gmail.com (dynamically set from the form)
    subject: 'Thank you for contacting me!',
    text: `Hello ${name},\n\nThank you for reaching out. I have received your message:\n"${message}"\n\nI'll get back to you soon.\n\nBest regards,\nVenkata Sainath`,
  };

  // Email to yourself
  const adminMailOptions = {
    from: process.env.EMAIL_USER, // xyz@gmail.com
    to: process.env.EMAIL_USER, // Your email (to receive form submissions)
    subject: 'New Contact Form Submission',
    text: `New message received from the contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(userMailOptions); // Send confirmation to the user
    await transporter.sendMail(adminMailOptions); // Send form data to yourself

    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
