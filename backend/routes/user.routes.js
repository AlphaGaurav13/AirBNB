const express = require("express");
const getCurrentUser = require("../controllers/user.controller.js");
let userRouter = express.Router();

// Public endpoint: returns null if no valid logged-in user
userRouter.get("/currentuser", getCurrentUser);
module.exports = userRouter