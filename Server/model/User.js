const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    picture: DataTypes.STRING,
    wishlist: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    }
});

module.exports = User;
