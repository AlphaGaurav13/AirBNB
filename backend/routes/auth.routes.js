const express = require("express");
const  { login, signUp, logOut  }  = require("../controllers/auth.controller.js");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);
module.exports = authRouter;