const express = require("express");

const app = express();

app.get("/api/blogs", (req, res) => {
  res.send("haloo lyngen");
});

module.exports = app;
