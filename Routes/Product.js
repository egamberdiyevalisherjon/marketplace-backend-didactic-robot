const express = require("express");
const {
  create,
  update,
  getAll,
  getOne,
  deleteOne,
  getAllByCategory,
} = require("../Controllers/Product");
const router = express.Router();

router.route("/").post(create).get(getAll);

router.route("/category/:_id").get(getAllByCategory);

router.route("/:_id").put(update).get(getOne).delete(deleteOne);

module.exports = router;
