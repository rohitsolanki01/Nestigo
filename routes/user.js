const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utills/wrapAsyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controller/users.js");

router
  .route("/signup")
  //given form for the signup
  .get(usersController.renderSignUpForm)
  //signup user info stor db
  .post(wrapAsync(usersController.signUp));

router
  .route("/login")
  //given form for login
  .get(usersController.renderLoginForm)
  //strote user info in db
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.login
  );

router.get("/logout", usersController.logOut);
module.exports = router;
