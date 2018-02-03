var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    
    User = require("../models/user");
 
 
//START
router.get("/", function(req, res) {
    res.render("landing", {user: req.user});
})
//LOGIN FORM
router.get("/login", function(req, res){
    res.render("login", {user: req.user});
});
//LOGIN VALIDATION AND PROCESS
router.post("/login", passport.authenticate('local', {
    successRedirect: "/landing",
    failureRedirect: "/login", 
    failureFlash: "You must've entered wrong username or password",
    successFlash: "Welcome to PhysioBase"
    }), function(req, res) {
       
});
//LOGOUT
router.get("/logout", function(req,res){
    req.logout();
    res.render("/");
})

module.exports = router;