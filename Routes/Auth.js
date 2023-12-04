const express = require("express");
const { login } = require("../Controllers/Auth");
const router = express.Router();

router.route("/").post(login);

module.exports = router;
