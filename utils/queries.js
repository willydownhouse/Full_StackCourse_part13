const { Op } = require("sequelize");

const getAllBlogsFilter = (keyword) => {
  return {
    [Op.or]: [
      {
        title: {
          [Op.substring]: keyword.toLowerCase(),
        },
      },
      {
        author: {
          [Op.substring]: keyword.toLowerCase(),
        },
      },
    ],
  };
};

module.exports = {
  getAllBlogsFilter,
};
