const { Blog, User } = require("../models");

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["UserId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
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
  console.log(req.user.dataValues);

  const blog = new Blog({
    author: req.body.author,
    title: req.body.title,
    url: req.body.url,
    likes: req.body.likes,
    UserId: req.user.dataValues.id,
  });

  await blog.save();

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
