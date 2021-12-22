const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:username").put(userController.changeUsername);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .get(userController.getOneUser);

module.exports = router;
