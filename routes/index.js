var express = require("express"),
    router = express.Router();
var passport = require("passport");
var User = require("../models/user"),
Patient = require("../models/patient"),
    Refferal = require("../models/refferal");
 

 
//START
router.get("/", function(req, res) {
    res.render("landing");

});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render('register', { user : user });
            
        }

        passport.authenticate('local')(req, res, function () {
            req.flash("success", "Welcome to PhysioBase, "+ user.username);
            res.redirect('/');
            
        });
    });
});
//LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});
//LOGIN VALIDATION AND PROCESS
//handle login logic
router.post("/login", 
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login", 
    failureFlash: "Wprowadzono niepoprawny login lub hasło",
    successFlash: "Witamy w PhysioBase"
    }), 
    function(req, res) {
});

//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Pomyślnie wylogowano z systemu!");
    res.redirect("/");
});

module.exports = router;