const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const UserReading = sequelize.define(
  "UserReading",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    ReadingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "readings", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user_readings",
  }
);

module.exports = UserReading;
