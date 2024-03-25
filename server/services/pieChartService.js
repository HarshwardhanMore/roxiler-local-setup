const Product = require("../models/productModel");
const sequelize = require("../models/index");
const { QueryTypes } = require("sequelize");

// Service function to fetch data for the pie chart
exports.getPieChartData = async (month) => {
  try {
    // Query the database to get unique categories and count of items in each category for the selected month
    // const pieChartData = await Product.findAll({
    //     attributes: ['category', [sequelize.fn('COUNT', 'category'), 'count']],
    //     where: {
    //         // Filter by month (assuming dateOfSale is stored as a timestamp)
    //         // You may need to adjust the query based on your database schema
    //         dateOfSale: {
    //             [Op.and]: [
    //                 sequelize.literal(`MONTH(dateOfSale) = ${month}`),
    //             ],
    //         },
    //     },
    //     group: ['category'],
    // });

    const query = `SELECT category, COUNT(*) AS count from Products WHERE dateOfSale LIKE '%-${month}-%' GROUP BY category`;
    const pieChartData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    // const filteredPieChartData = pieChartData.filter((item) => {
    //   item?.dateOfSale.toString().split("-")[1] == month.toString();
    // });
    return pieChartData;
  } catch (error) {
    throw error;
  }
};
