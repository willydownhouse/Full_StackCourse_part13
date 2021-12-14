const Blog = require("./blogModel");
const User = require("./userModel");

Blog.sync();
User.sync();

module.exports = {
  Blog,
  User,
};
