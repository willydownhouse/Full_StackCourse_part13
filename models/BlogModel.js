const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const minYear = 1991;

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isBetween: function (value) {
          if (
            parseInt(value) < minYear ||
            parseInt(value) > new Date().getFullYear()
          ) {
            throw new Error(
              `Year must be between ${minYear} and ${new Date().getFullYear()}`
            );
          }
        },
      },
      defaultValue: new Date().getFullYear(),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

module.exports = Blog;
