let express = require("express");
let routes = express.Router();
let categoryRoute = require("./category.route");
let productRoute = require("./product.route");
let userRoute = require("./user.route")

routes.use("/category", categoryRoute);
routes.use("/product", productRoute);
routes.use("/user", userRoute);

module.exports = routes;