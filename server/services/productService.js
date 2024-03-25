// services/productService.js

const Product = require("../models/productModel");
const { Op } = require("sequelize");
const sequelize = require("../models/index");

// exports.getAllTransactions = async () => {
//   try {
//     const transactions = await Product.findAll();
//     return transactions;
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     throw error;
//   }
// };

// services/productService.js
// services/productService.js

// exports.getAllTransactions = async (page, perPage, search) => {
//   let whereClause = {};

//   if (search) {
//     whereClause = {
//       [Op.or]: [
//         { title: { [Op.iLike]: `%${search}%` } },
//         { description: { [Op.iLike]: `%${search}%` } },
//         { price: { [Op.iLike]: `%${search}%` } }
//       ]
//     };
//   }

//   const totalCount = await Product.count({ where: whereClause });
//   const totalPages = Math.ceil(totalCount / perPage);
//   const offset = (page - 1) * perPage;

//   const transactions = await Product.findAll({
//     where: whereClause,
//     limit: perPage,
//     offset: offset
//   });

//   return {
//     transactions,
//     pagination: {
//       page,
//       perPage,
//       totalPages,
//       totalCount
//     }
//   };
// };

exports.getAllTransactions = async (page, perPage, search, month) => {
  let whereClause = {};

  if (month) {
    const searchPattern = `%-${month}-%`;
    whereClause = {
      ...whereClause,
      ...{
        [Op.or]: [
          sequelize.where(sequelize.col("dateOfSale"), "LIKE", searchPattern),
        ],
      },
    };
  }
  if (search) {
    const searchPattern = `%${search.toLowerCase()}%`;
    whereClause = {
      ...whereClause,
      ...{
        [Op.or]: [
          sequelize.where(
            sequelize.fn("LOWER", sequelize.col("title")),
            "LIKE",
            searchPattern
          ),
          sequelize.where(
            sequelize.fn("LOWER", sequelize.col("description")),
            "LIKE",
            searchPattern
          ),
          sequelize.where(
            sequelize.fn("LOWER", sequelize.col("price")),
            "LIKE",
            searchPattern
          ),
        ],
      },
    };
  }

  const totalCount = await Product.count({ where: whereClause });
  const totalPages = Math.ceil(totalCount / perPage);
  const offset = (page - 1) * perPage;

  const transactions = await Product.findAll({
    where: whereClause,
    limit: perPage,
    offset: offset,
  });

  // let filteredTransactions = [];

  // console.log("month 00000000000000000000000000 : ", month);

  // if (month) {
  //   filteredTransactions = transactions.filter((transaction) => {
  //     // console.log(transaction);
  //     // console.log(transaction?.dateOfSale);
  //     // console.log(transaction?.dateOfSale.getMonth());
  //     // console.log(transaction?.dateOfSale.toString());
  //     // console.log(transaction?.dateOfSale.toString().split("-"));
  //     // console.log(transaction?.dateOfSale.toString().split("-")[0]);
  //     return (
  //       `${transaction?.dateOfSale.getMonth() + 1 < 10 ? "0" : ""}${
  //         transaction?.dateOfSale.getMonth() + 1
  //       }` == month
  //     );
  //     // transaction?.dateOfSale.toString().split("-")[0] == month;
  //   });
  //   console.log("transaction ----------------> ", filteredTransactions);
  // }

  return {
    transactions: transactions,
    pagination: {
      page,
      perPage,
      totalPages,
      totalCount,
    },
  };
};
