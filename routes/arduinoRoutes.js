const express = require('express');
const { getToken, updateProperty, getPropertyValue } = require('../controllers/arduinoController');
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

router.put('/property', async (req, res) => {
    try {
        const { propertyId, newValue } = req.body;  

        try {
            await updateProperty(propertyId, newValue);
            res.status(200).json({ success: true, message: 'Property updated successfully' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Failed to update property' });
        }
    } catch (error) {
        console.error("Error in /property route:", error);
        res.status(500).json({ success: false, message: error });
    }
});

router.get('/property/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;  // retrieving propertyId from the URL parameter
        const propertyValue = await getPropertyValue(propertyId);

        if (propertyValue) {
            res.status(200).json({ success: true, propertyId, value: propertyValue });
        } else {
            res.status(404).json({ success: false, message: 'Property not found' });
        }
    } catch (error) {
        console.error("Error in /property route:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
