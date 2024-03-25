const express = require('express');
const router = express.Router();
const pieChartController = require('../controllers/pieChartController');

// GET request to fetch data for the pie chart
router.get('/', pieChartController.getPieChartData);

module.exports = router;
