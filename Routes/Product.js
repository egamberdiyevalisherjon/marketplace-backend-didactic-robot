const express = require("express");
const {
  create,
  update,
  getAll,
  getOne,
  deleteOne,
  getAllByCategory,
  searchProduct,
} = require("../Controllers/Product");
const ProtectedRoute = require("../Utils/ProtectedRoute");
const router = express.Router();

router.route("/").post(ProtectedRoute, create).get(getAll);
router.route("/search").get(searchProduct);

router.route("/category/:_id").get(getAllByCategory);

router
  .route("/:_id")
  .get(getOne)
  .put(ProtectedRoute, update)
  .delete(ProtectedRoute, deleteOne);

module.exports = router;
