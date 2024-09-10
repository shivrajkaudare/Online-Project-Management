const Router = require("express");

const router = Router();

const { login, register } = require("../controller/user.controller.js");

router.route("/login").post(login);

router.route("/register").post(register);

module.exports = router;
