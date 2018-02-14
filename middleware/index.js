var User = require("../models/user"),
    Patient = require("../models/patient"),
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
    if(req.isAuthenticated()){
        Patient.findById(req.params.patient_id, function(err, foundPatient){
            if(err){
                console.log("Couldn't find any patient");
            }else{
                if(!foundPatient){
                    res.redirect("back");
                }else{
                    if(foundPatient){
                        next();
                    }
                    else{
                        req.flash("error", "Nie masz uprawnień do tego.");
                        res.redirect("back");
                    }
                }
            }
        })
    }
}
module.exports = middlewareObj;