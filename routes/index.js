var express = require("express"),
    mongoose= require("mongoose"),
    router = express.Router();
var passport = require("passport");
var db = require("../models");
 

 
//START
router.get("/", function(req, res) {
    res.render("landing");

});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    var role = "";
    if(!(req.body.role === undefined)){
        if(Array.isArray(req.body.role) && req.body.role.length > 1){
                    for(var i = 0; i<req.body.role.length; i++){
                               var id = mongoose.Types.ObjectId(req.body.role[i]);
                               role.push(id);
                    }
                }else{
                 role =  mongoose.Types.ObjectId(req.body.role) 
                }
        }else{
            role = [];
        }
    db.User.register(new db.User({ username : req.body.username, firstname:req.body.firstname, lastname: req.body.lastname, pesel: req.body.pesel, role: role  }), req.body.password, function(err, user) {
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