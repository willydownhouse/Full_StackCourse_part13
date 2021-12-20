const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      validate: {
        isBetween: function (value) {
          if (parseInt(value) < 1991) {
            return false;
          }
          return true;
        },
      },

      defaultValue: new Date().getFullYear(),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
