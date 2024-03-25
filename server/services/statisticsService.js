// services/productService.js

// const Product = require("../models/productModel");
const sequelize = require("../models/index");
const { QueryTypes } = require("sequelize");


exports.getStatistics = async (month) => {
  // const allData = await Product.findAll();
  const query1 = `SELECT sold AS isSold, COUNT(*) AS count from Products WHERE dateOfSale LIKE '%-${month}-%' GROUP BY sold ORDER BY sold`;
  const query2 = `SELECT SUM(price) AS sum from Products WHERE dateOfSale LIKE '%-${month}-%' AND sold = true`;
  const statisticsData = await sequelize.query(query1, {
    type: QueryTypes.SELECT,
  });
  const saleAmount = await sequelize.query(query2, {
    type: QueryTypes.SELECT,
  });

  console.log("statisticsData : ", statisticsData);
  console.log("saleAmount : ", saleAmount);

  // const soldData = await Product.findAll({
  //   where: {
  //     sold: true,
  //   },
  // });
  // const unSoldData = await Product.findAll({
  //   where: {
  //     sold: false,
  //   },
  // });
  // // let saleAmount = soldData.reduce((sum, item) => sum + item?.price);
  // const saleAmount = soldData.reduce(
  //   (sum, item) => sum + (item?.price || 0),
  //   0
  // );

  // console.log(
  //   "soldData --------------------------------------------------: ",
  //   soldData
  // );
  // console.log(
  //   "unSoldData -------------------------------------------------- : ",
  //   unSoldData
  // );






  // const filteredData = allData.filter(
  //   (item) => item?.dataValues?.dateOfSale.toString().split("-")[1] == month.toString()
  // );
  // const filteredData = allData.filter((item) => {
  //   const dateOfSale = item?.dateOfSale;
  //   if (dateOfSale && typeof dateOfSale === "string") {
  //     const monthPart = dateOfSale.split("-")[1];
  //     return monthPart == month;
  //   }
  //   return false;
  // });

  // console.log("filteredData : ", filteredData);
  // console.log("allData : ", allData);

  // let saleAmount = 0,
  //   soldItems = 0,
  //   unSoldItems = 0;

  // for (let item of filteredData) {
  //   if (item?.sold == true) {
  //     saleAmount += item.price;
  //     soldItems++;
  //   } else {
  //     unSoldItems++;
  //   }
  // }

  // console.log("{ saleAmount, soldItems, unSoldItems } : ", {
  //   saleAmount,
  //   soldItems,
  //   unSoldItems,
  // });
  return {
    saleAmount: saleAmount[0].sum,
    soldItems: statisticsData[1].count,
    unSoldItems: statisticsData[0].count,
  };
  // return {
  //   saleAmount: saleAmount,
  //   soldItems: soldData.length,
  //   unSoldItems: unSoldData.length,
  // };
};
exports.getTotalSaleAmountOfMonth = async (month) => {
  //   const totalSaleAmount = await Product.sum('price', {
  //   where: {
  //     sold: true,
  //     // Assuming dateOfSale is a DATE or DATETIME field
  //     // Adjust the format according to your database schema
  //     dateOfSale: { $like: `%-${month}-%` }
  //   }
  // });
  // return totalSaleAmount || 0; // Return 0 if no sales found
};

exports.getTotalSoldItemsOfMonth = async (month) => {
  const totalSoldItems = await Product.count({
    where: {
      sold: true,
      dateOfSale: { $like: `%-${month}-%` },
    },
  });
  return totalSoldItems || 0; // Return 0 if no sales found
};

exports.getTotalNotSoldItemsOfMonth = async (month) => {
  const totalNotSoldItems = await Product.count({
    where: {
      sold: false,
      // Assuming createdAt is a DATE or DATETIME field
      // Adjust the format according to your database schema
      createdAt: { $like: `%-${month}-%` },
    },
  });
  return totalNotSoldItems || 0; // Return 0 if no unsold items found
};
