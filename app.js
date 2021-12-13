//const Blog = require("./models/BlogModel");
const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.create(req.body);

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(+req.params.id);

    if (!blog) {
      return res.status(404).send("No blog with that ID");
    }
    await Blog.destroy({
      where: {
        id: blog.dataValues.id,
      },
    });

    res.status(200).end();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = app;
