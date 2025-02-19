// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Nodemailer Transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // xyz@gmail.com
//     pass: process.env.EMAIL_PASS, // 1234 (or your app password)
//   },
// });

// // Email Sending Route
// app.post('/send-email', async (req, res) => {
//   const { name, email, message } = req.body; // Extract form data from request

//   // Email to the user
//   const userMailOptions = {
//     from: process.env.EMAIL_USER, // xyz@gmail.com
//     to: email, // abc@gmail.com (dynamically set from the form)
//     subject: 'Thank you for contacting me!',
//     text: `Hello ${name},\n\nThank you for reaching out. I have received your message:\n"${message}"\n\nI'll get back to you soon.\n\nBest regards,\nVenkata Sainath`,
//   };

//   // Email to yourself
//   const adminMailOptions = {
//     from: process.env.EMAIL_USER, // xyz@gmail.com
//     to: process.env.EMAIL_USER, // Your email (to receive form submissions)
//     subject: 'New Contact Form Submission',
//     text: `New message received from the contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(userMailOptions); // Send confirmation to the user
//     await transporter.sendMail(adminMailOptions); // Send form data to yourself

//     res.status(200).json({ message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     res.status(500).json({ error: 'Failed to send emails' });
//   }
// });

// // Start Server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins

// REMOVE Helmet to avoid CSP conflicts
// app.use(helmet());  <-- Comment this out if you had it

// Completely disable CSP for debugging
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
  next();
});

// Check .env file values
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env file");
  process.exit(1);
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API Route for sending emails
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hello ${name},\n\nThank you for reaching out. I'll get back to you soon.\n\nBest regards,\nVenkata Sainath`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `New message received:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: '✅ Emails sent successfully!' });
  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
