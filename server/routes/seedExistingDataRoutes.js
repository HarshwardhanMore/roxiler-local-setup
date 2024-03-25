// routes/seedExistingDataRoutes.js

const express = require('express');
const router = express.Router();
const seedExistingDataController = require('../controllers/seedExistingDataController');

// Pass reference to controller function without invoking it
router.get('/', seedExistingDataController.seedData);

module.exports = router;
