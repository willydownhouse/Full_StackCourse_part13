const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.checkIfLoggedIn, blogController.getAllBlogs)
  .post(authController.checkIfLoggedIn, blogController.createBlog);

router
  .route("/:id")
  .delete(authController.checkIfLoggedIn, blogController.deleteBlog)
  .put(blogController.updateLikes);

module.exports = router;
