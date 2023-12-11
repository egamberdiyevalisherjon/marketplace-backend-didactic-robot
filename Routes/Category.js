const express = require("express");
const { update, getAllOf, create, getOneOf } = require("../Controllers");
const ProductCategory = require("../Models/Category");
const ProtectedRoute = require("../Utils/ProtectedRoute");
const router = express.Router();

router
  .route("/")
  .post(ProtectedRoute, create(ProductCategory))
  .get(getAllOf(ProductCategory));

router
  .route("/:_id")
  .put(ProtectedRoute, update(ProductCategory))
  .get(getOneOf(ProductCategory));

module.exports = router;
