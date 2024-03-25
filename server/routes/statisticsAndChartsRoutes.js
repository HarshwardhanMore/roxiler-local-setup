// routes/seedExistingDataRoutes.js

const express = require('express');
const router = express.Router();
const statisticsAndChartsController= require('../controllers/statisticsAndChartsController');

// Pass reference to controller function without invoking it
router.get('/', statisticsAndChartsController.getAll);

module.exports = router;
