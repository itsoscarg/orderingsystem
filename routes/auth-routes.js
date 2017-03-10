const express    = require("express");
const authRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
const Product = require('../models/product.js');
const Order = require('../models/neworder.js');
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
////////////////////
const passport = require('passport');

authRoutes.get("/blogin", (req, res, next) => {
  res.render("buyer/blogin", {
   errorMessage: req.flash('error')
  });
});

authRoutes.post("/blogin",
passport.authenticate("local", {
  successRedirect: "/order",
  failureRedirect: "/blogin",
  failureFlash: true,
  successFlash: 'You have been logged in, user!',
  passReqToCallback: true
}));


authRoutes.get("/xyzlogin", (req, res, next) => {
  res.render("xyz/xyzlogin", {
   errorMessage: req.flash('error')
  });
});

authRoutes.post("/xyzlogin",
passport.authenticate("local", {
  successRedirect: "/orderview",
  failureRedirect: "/xyzlogin",
  failureFlash: true,
  successFlash: 'You have been logged in, user!',
  passReqToCallback: true
}));

authRoutes.get("/order", ensureLogin.ensureLoggedIn('/blogin'), (req, res) => {
  Product.find( (err, products) => {
    if (err) {
      next(err);
      return;
    }
  res.render("buyer/order", {
    user: req.user,
    hhh:products
    });
  });
});

//Post Order Route to create your Order in the db

  authRoutes.post("/order", (req, res, next) => {
    // const name = req.body.name;
    const quantity1 = req.body.qnt0;
    const quantity2 = req.body.qnt1;

    //Price has to be dynamic
    var firstItem = (119 * quantity1);
    var secondItem = (139 * quantity2);

    const newOrder = Order({
      name: "Order 1",
      price: firstItem + secondItem
    });

    newOrder.save((err) => {
      if (err) {
        console.log(err);
        res.redirect("/order");
      } else {
        res.redirect("/orderview");
      }
        });
    });



authRoutes.get('/products/:id', (req, res, next) => {
    //                 --
    //                  |
    //                  --------
    //                         |
  const productId = req.params.id;

  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next(err);
      return;
    }

    res.render('buyer/order', {
      product: products
    });
  });
});


function checkRoles(role) {
  return function(req, res, next) {
    console.log(req.user);
      console.log(req.user.role);
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/');
    }
  };
}

authRoutes.get('/orderview', checkRoles('ADMIN'), (req, res) => {

  Order.find({}, (err, result) => {
    if (err){
      console.log(error);
      res.redirect("/");
    }
    console.log(result);
      res.render('xyz/orderview', {user: req.user, orders: result});
  });


});

authRoutes.post("/orderview",
passport.authenticate("local", {
  successRedirect: "/orderview",
  failureRedirect: "/xyzlogin",
  failureFlash: true,
  successFlash: 'You have been logged in, user!',
  passReqToCallback: true
}));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



// var checkGuest  = checkRoles('GUEST');
// var checkEditor = checkRoles('EDITOR');
// var checkAdmin  = checkRoles('ADMIN');



// authRoutes.get('/orderview', checkAdmin, (req, res) => {
//   res.render('xyz/orderview', {user: req.user});
// });


module.exports = authRoutes;
