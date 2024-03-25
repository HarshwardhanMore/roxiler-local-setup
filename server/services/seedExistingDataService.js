const axios = require("axios");
const sequelize = require("../models");
const Product = require("../models/productModel");

exports.seedData = async () => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Sync the models with the database
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them

    // Insert seed data into the Product table
    await Product.bulkCreate(products);

    console.log("Database initialized with seed data");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    // Close the database connection
    // await sequelize.close();
  }
};
