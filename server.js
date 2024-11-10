// server.js
const express = require('express');
const cors = require('cors');
const smsRoutes = require('./routes/smsRoutes');
const arduinoRoutes = require('./routes/arduinoRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sms', smsRoutes);
app.use('/api/arduino', arduinoRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
