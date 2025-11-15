const express = require('express');
const nodemailer = require('nodemailer');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Send email
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `Next Home Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: 'Message sent successfully'
  });
}));

module.exports = router;