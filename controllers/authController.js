const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Token } = require("../models");
const { SECRET, EXPIRES } = require("../utils/config");

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Please give username and password",
    });
  }

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Wrong username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: EXPIRES,
  });

  await Token.create({
    token,
    userId: user.id,
  });

  res.status(200).json({
    username: user.username,
    name: user.name,
    token,
  });
};

exports.checkIfLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.substring(7);
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Please login to get access",
    });
  }

  const decoded = jwt.verify(token, SECRET);

  const user = await User.findByPk(decoded.id);

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "No user for this token. Please login again.",
    });
  }

  token = await Token.findOne({
    where: {
      userId: user.id,
    },
  });

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You don't have active token. Please login again",
    });
  }

  req.user = user;

  next();
};

exports.allowOnlyTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to do this action",
      });
    }

    next();
  };

exports.logout = async (req, res) => {
  await Token.destroy({
    where: {
      userId: req.user.id,
    },
  });

  res.send("Succesfully logged out");
};
