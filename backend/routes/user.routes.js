const express = require("express");
const isAuth = require("../middleware/isAuth");
const getCurrentUser = require("../controllers/user.controller.js");
let userRouter = express.Router();


userRouter.get("/currentuser", isAuth, getCurrentUser);
module.exports = userRouter