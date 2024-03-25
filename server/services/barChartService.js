const Product = require("../models/productModel");

exports.getBarChartData = async (month) => {
  const priceRanges = [
    { range: "0 - 100", min: 0, max: 100 },
    { range: "101 - 200", min: 101, max: 200 },
    { range: "201 - 300", min: 201, max: 300 },
    { range: "301 - 400", min: 301, max: 400 },
    { range: "401 - 500", min: 401, max: 500 },
    { range: "501 - 600", min: 501, max: 600 },
    { range: "601 - 700", min: 601, max: 700 },
    { range: "701 - 800", min: 701, max: 800 },
    { range: "801 - 900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const priceRangeCounts = {};

  const items = await Product.findAll({
    where: {
      sold: true,
    },
  });

  items.forEach((item) => {
    const saleMonth = new Date(item.dateOfSale).getMonth() + 1; // Adding 1 to get 1-based month
    if (saleMonth == month) {
      const price = item.price;
      const range = priceRanges.find(
        (range) => price >= range.min && price <= range.max
      );
      if (range) {
        priceRangeCounts[range.range] =
          (priceRangeCounts[range.range] || 0) + 1;
      }
    }
  });

  const barChartData = priceRanges.map((range) => ({
    range: range.range,
    count: priceRangeCounts[range.range] || 0,
  }));

  return barChartData;
};
