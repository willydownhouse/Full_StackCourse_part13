const express = require("express");
const readingListController = require("../controllers/readingListController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .post(readingListController.addBlogToReadingList)
  .get(readingListController.getAllReadings);

router
  .route("/:id")
  .delete(readingListController.deleteById)
  .put(
    authController.checkIfLoggedIn,
    readingListController.changeReadedToTrue
  );

router.route("/all").get(readingListController.getAllUserReadings);

module.exports = router;
