const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      validate: {
        isGreaterThanOtherField(value) {
          if (parseInt(value) < 1991) {
            console.log("VÄÄRÄ VUOSI");
          }
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
