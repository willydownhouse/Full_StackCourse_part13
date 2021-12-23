const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.checkIfLoggedIn);

router.route("/").delete(authController.logout);

module.exports = router;
