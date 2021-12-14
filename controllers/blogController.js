const { Blog } = require("../models");

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.findAll();
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
  const blog = await Blog.create(req.body);
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
  await Blog.destroy({
    where: {
      id: blog.dataValues.id,
    },
  });

  res.status(200).end();
};
