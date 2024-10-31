// controllers/mailController.js
const axios = require('axios');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { PHONE_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = require('../config/config');

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const carrierMap = {
  'AT&T': '@txt.att.net',
  'Sprint': '@pm.sprint.com',
  'T-Mobile': '@tmomail.net',
  'Verizon Wireless': '@vtext.com',
  'Boost Mobile': '@sms.myboostmobile.com',
  'Virgin Mobile': '@vmobl.com',
  'Cricket': '@sms.cricketwireless.net',
  'MetroPCS': '@mymetropcs.com',
};

async function sendMail(email) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'qihongw08@gmail.com',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: '<qihongw08@gmail.com>',
      to: email,
      subject: 'SMART-STEP ALERT',
      text: 'SMART-STEP USER IS IN NEED OF HELP',
    };

    await transport.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

async function sendSMS(phoneNumber) {
  try {
    console.log(phoneNumber);
    console.log(PHONE_API_KEY);
    const response = await axios.get(`https://www.ipqualityscore.com/api/json/phone/${PHONE_API_KEY}/${phoneNumber}?country[]=US`);
    const carrier = response.data.carrier;
    const email = phoneNumber + carrierMap[carrier];
    return sendMail(email);
  } catch (error) {
    console.error('Error in sendSMS:', error);
    return { success: false, message: 'Failed to send SMS' };
  }
}

module.exports = {
  sendSMS,
};
