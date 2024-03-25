// models/productModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  image: DataTypes.STRING,
  sold: DataTypes.BOOLEAN,
  dateOfSale: DataTypes.DATE
});

module.exports = Product;
