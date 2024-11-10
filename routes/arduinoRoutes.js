const express = require('express');
const { getToken } = require('../controllers/arduinoController');
const router = express.Router();

router.get('/token', async (req, res) => {
    try {
        const accessToken = await getToken();
        if (accessToken) {
            res.status(200).json({ success: true, token: accessToken });
        } else {
            res.status(500).json({ success: false, message: 'Failed to retrieve token' });
        }
    } catch (error) {
        console.error("Error in /token route:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
