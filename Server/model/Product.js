const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Product = sequelize.define("Product", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Product;
