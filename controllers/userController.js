const { User } = require("../models");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
};
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  await User.destroy({
    where: {
      id: user.dataValues.id,
    },
  });

  res.status(200).end();
};

//TÄSSÄ MENOSSA TEHTÄVÄ 13.8
exports.changeUsername = async (req, res) => {};
