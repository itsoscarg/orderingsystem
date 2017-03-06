const express    = require("express");
const authRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");

// User model
const User       = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("buyer/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("buyer/signup", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("buyer/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

const passport = require('passport');

authRoutes.get("/blogin", (req, res, next) => {
  res.render("buyer/blogin", {
   errorMessage: req.flash('error')
  });
});

authRoutes.post("/blogin",
passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/blogin",
  failureFlash: true,
  successFlash: 'You have been logged in, user!',
  passReqToCallback: true
}));

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = authRoutes;
