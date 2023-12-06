const express = require("express");
const { login, loginClient } = require("../Controllers/Auth");
const { create } = require("../Controllers/Client");
const router = express.Router();

router.route("/").post(login);

router.route("/client-login").post(loginClient);

router.route("/register").post(create);

module.exports = router;
