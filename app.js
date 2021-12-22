const express = require("express");
require("express-async-errors");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRoutes");
const authorRouter = require("./routes/authorRouter");
const readingListRouter = require("./routes/readingListRouter");
const {
  errorController,
  unknownEndPoint,
} = require("./controllers/errorController");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);

app.use(unknownEndPoint);
app.use(errorController);

module.exports = app;
