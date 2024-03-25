// controllers/statisticsController.js

const statisticsService = require('../services/statisticsService');

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Calculate total sale amount of selected month
    // const totalSaleAmount = await statisticsService.getTotalSaleAmountOfMonth(month);

    // // Calculate total number of sold items of selected month
    // const totalSoldItems = await statisticsService.getTotalSoldItemsOfMonth(month);

    // // Calculate total number of not sold items of selected month
    // const totalNotSoldItems = await statisticsService.getTotalNotSoldItemsOfMonth(month);

    // res.json({
    //   totalSaleAmount,
    //   totalSoldItems,
    //   totalNotSoldItems
    // });

    const dataToSend = await statisticsService.getStatistics(month);
    res.json(dataToSend);

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
