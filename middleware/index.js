var User = require("./models/user"),
    Patient = require("./models/patient"),
    middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "Musisz być zalogowany, żeby to zrobić");
        res.redirect("/");
    }
}

middlewareObj.checkOwnershipPatient = function(req, res, next){
    if()
}
module.exports = middlewareObj;