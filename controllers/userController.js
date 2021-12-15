const bcrypt = require("bcrypt");
const { User, Blog } = require("../models");

exports.createUser = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password,
  });

  const createdUser = await user.save();

  res.status(201).json(createdUser);
};
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });

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

exports.changeUsername = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  if (!req.body.username) {
    return res.status(400).json({
      status: "fail",
      message: "Please give a new username",
    });
  }

  user.username = req.body.username;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
};
