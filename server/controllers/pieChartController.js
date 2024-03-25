const pieChartService = require('../services/pieChartService');

// Controller function to handle GET request for fetching data for the pie chart
exports.getPieChartData = async (req, res) => {
    try {
        const { month } = req.query; // Assuming month is passed as a query parameter
        const pieChartData = await pieChartService.getPieChartData(month);
        res.json(pieChartData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
