let express = require("express");
const { fetchProduct, addProduct, deleteProduct, updateProduct } = require("../controller/product.controller");
const multer = require('multer');
const validate = require("../middaleware/validate");
const { product } = require("../validation/product.validation");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage }).fields([{ name: 'frontimage' }, { name: 'backimage' }]);

let route = express.Router();

route.get("/getproduct", fetchProduct);
route.post("/addproduct", upload, validate(product), addProduct);
route.delete("/deleteProduct/:id", deleteProduct);
route.put("/updateproduct/:id", upload, validate(product), updateProduct)


module.exports = route;