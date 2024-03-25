// controllers/seedExistingDataController.js

// const statisticsAndChartsService = require('../services/statisticsAndChartsService');
const statisticsService = require('../services/statisticsService');
const barChartService = require('../services/barChartService');
const pieChartService = require('../services/pieChartService');
const seedExistingDataService = require("../services/seedExistingDataService");

exports.getAll = async (req, res) => {
  const { month } = req.query;
  try {
    // await seedExistingDataService.seedData();

    const statistics = await statisticsService.getStatistics(month);
    const barCharts = await barChartService.getBarChartData(month)
    const pieCharts = await pieChartService.getPieChartData(month);
    res.json({statistics, barCharts, pieCharts}); // Send response to indicate success
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
