const express = require("express");
require("express-async-errors");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const {
  errorController,
  unknownEndPoint,
} = require("./controllers/errorController");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(unknownEndPoint);
app.use(errorController);

module.exports = app;
