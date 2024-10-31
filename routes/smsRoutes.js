// routes/mailRoutes.js
const express = require('express');
const { sendSMS, sendMail } = require('../controllers/smsController');
const router = express.Router();

router.post('/send-sms', async (req, res) => {
  const { phoneNumber } = req.body;
  const result = await sendSMS(phoneNumber);
  res.status(result.success ? 200 : 500).json(result);
});

router.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const result = await sendMail(email);
  res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;

