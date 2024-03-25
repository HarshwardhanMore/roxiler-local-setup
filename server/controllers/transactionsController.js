// controllers/transactionsController.js

const productService = require("../services/productService");

// exports.getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await productService.getAllTransactions();
//     res.json(transactions);
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month } = req.query;
    // await seedExistingDataService.seedData();
    const transactions = await productService.getAllTransactions(
      page,
      perPage,
      search,
      month
    );
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
