const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Reading = sequelize.define(
  "Reading",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "reading",
  }
);

module.exports = Reading;
