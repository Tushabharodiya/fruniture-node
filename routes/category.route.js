let express = require("express");
const { fetchCategory, createCategory, deleteCategory, updateCategory } = require("../controller/category.controller");
const validate = require("../middaleware/validate");
const { category } = require("../validation/category.validation");
let route = express.Router();



route.get("/get", fetchCategory);
route.post("/add", validate(category), createCategory);
route.delete("/delete/:id", deleteCategory);
route.put("/update/:id", validate(category), updateCategory)


module.exports = route;