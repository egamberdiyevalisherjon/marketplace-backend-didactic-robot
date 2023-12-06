const express = require("express");
const { getAllOf, getOneOf, deleteOne } = require("../Controllers");
const { update, addToCart, getInfo } = require("../Controllers/Client");
const Client = require("../Models/Client");
const router = express.Router();

router.route("/").get(getAllOf(Client));

router.route("/me").get(getInfo);

router.route("/cart").post(addToCart);

router
  .route("/:_id")
  .put(update)
  .get(getOneOf(Client))
  .delete(deleteOne(Client));

module.exports = router;
