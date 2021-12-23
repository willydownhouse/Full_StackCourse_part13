const Blog = require("./blogModel");
const User = require("./userModel");
const Reading = require("./readingModel");
const UserReading = require("./userReading");
const Token = require("./tokenModel");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

Reading.belongsTo(Blog);
Blog.hasMany(Reading);

User.belongsToMany(Reading, { through: UserReading });
Reading.belongsToMany(User, { through: UserReading });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  Reading,
  UserReading,
  Token,
};
