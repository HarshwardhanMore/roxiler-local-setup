const barChartService = require('../services/barChartService');

exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query; // Assuming month is passed as a query parameter
    const barChartData = await barChartService.getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
