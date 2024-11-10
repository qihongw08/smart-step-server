// config/config.js
require('dotenv').config();

module.exports = {
  PHONE_API_KEY: process.env.PHONE_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  ARDUINO_CLIENT_ID: process.env.ARDUINO_CLIENT_ID,
  ARDUINO_CLIENT_SECRET: process.env.ARDUINO_CLIENT_SECRET,
};
