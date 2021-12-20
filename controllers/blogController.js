const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { getAllBlogsFilter } = require("../utils/queries");
const { sequelize } = require("../utils/db");

exports.getAllBlogs = async (req, res, next) => {
  let where = {};

  if (req.query.search) {
    where = getAllBlogsFilter(req.query.search);
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["UserId"],
      //include: ["created_at", "updated_at"],
    },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
};

exports.updateLikes = async (req, res, next) => {
  const { likes } = req.body;
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.status(400).json({
      status: "fail",
      message: "No document with that ID",
    });
  } else if (!likes) {
    return res.status(400).json({
      status: "fail",
      message: "No likes in request body",
    });
  }

  blog.likes = likes;
  await blog.save();

  res.json({
    likes: blog.likes,
  });
};

exports.createBlog = async (req, res, next) => {
  console.log("CURRENT USER");
  console.log(req.user.dataValues.username);

  const blog = await Blog.create({
    UserId: req.user.dataValues.id,
    ...req.body,
  });

  res.status(201).json(blog);
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.status(400).json({
      status: "fail",
      message: "No document with that ID",
    });
  }

  if (req.user.dataValues.id === blog.UserId) {
    await Blog.destroy({
      where: {
        id: blog.dataValues.id,
      },
    });

    res.status(200).end();
  } else {
    res.status(401).json({
      status: "fail",
      message: "You can delete only your own blogs",
    });
  }
};

exports.authorsBlogsAndLikes = async (req, res) => {
  const sum = await Blog.sum("likes");

  console.log(sum);

  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("count", "Blog.id"), "blogs"],
      [sequelize.fn("sum", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
  });
  res.status(200).json(authors);
};
