const bcrypt = require("bcrypt");
const { User, Blog, Reading, UserReading, Token } = require("../models");

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

exports.getOneUser = async (req, res) => {
  console.log(req.query);

  const user = await User.findByPk(req.params.id);

  console.log(user);

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  const where = {};

  if (req.query.hasOwnProperty("read")) {
    where.readed = req.query.read;
  }

  const userWithReadings = await User.findByPk(req.params.id, {
    include: {
      model: Reading,
      attributes: {
        exclude: ["BlogId"],
      },
      include: {
        model: Blog,
        attributes: {
          exclude: ["UserId"],
        },
      },
      where,
    },
  });

  if (!userWithReadings) {
    return res.status(400).json({
      status: "fail",
      message: `No readings found for ${user.toJSON().name}`,
    });
  }

  res.status(200).json(userWithReadings);
};

exports.getOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  console.log(user);

  // const userReadings = await UserReading.findAll({
  //   where: {
  //     UserId: req.params.id,
  //   },
  //   include: {
  //     model: Reading,
  //   },
  // });

  const userReadings = await User.findByPk(req.params.id, {
    include: {
      model: Reading,
      include: {
        model: Blog,
      },
      attributes: {
        include: ["id", "readed", "BlogId"],
      },
    },
  });

  console.log();

  res.status(200).json(userReadings);
};

exports.updateUser = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "No user with that ID",
    });
  }

  const updatedUser = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  if (req.body.disabled) {
    await Token.destroy({
      where: {
        userId: req.params.id,
      },
    });
    console.log("TOKENIT POISTETTU");
  }

  res.status(200).json(updatedUser);
};
