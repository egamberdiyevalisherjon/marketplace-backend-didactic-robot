/* Modules */
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Routes */
const ProductRoute = require("./Routes/Product");
const ProductCategoryRoute = require("./Routes/Category");
const UserRoute = require("./Routes/User");
const AuthRoute = require("./Routes/Auth");
const ProtectedRoute = require("./Utils/ProtectedRoute");
const AdminRoute = require("./Utils/AdminRoute");

app.use(cors("*"));

app.use(express.json());

app.use((req, res, next) => {
  if (req.url.slice(-1) === "/" && req.path.length > 1) {
    req.url = req.url.slice(0, -1);
  }
  next();
});

app.use("/api/v1/products", ProtectedRoute, ProductRoute);
app.use("/api/v1/categories", ProtectedRoute, ProductCategoryRoute);
app.use("/api/v1/users", AdminRoute, UserRoute);
app.use("/api/v1/auth", AuthRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    msg: "NOT FOUND",
  });
});

module.exports = app;
