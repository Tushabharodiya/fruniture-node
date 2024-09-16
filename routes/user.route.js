let express = require("express");
const { userRegister } = require("../controller/user.controller");
const { user } = require("../validation/user.validation");
const validate = require("../middaleware/validate");
let route = express.Router();



route.post("/register", validate(user), userRegister)


module.exports = route;