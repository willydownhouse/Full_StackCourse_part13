const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:username").put(userController.changeUsername);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .get(userController.getOneUser)
  .patch(
    authController.checkIfLoggedIn,
    authController.allowOnlyTo("admin"),
    userController.updateUser
  );
//.get(userController.getOne);

module.exports = router;
