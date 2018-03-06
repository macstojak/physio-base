var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Patient = require("../models/patient"),
    Refferal = require("../models/refferal"),
    Doctor = require("../models/doctor"),
    Clinic = require("../models/clinic"),
    Disease = require("../models/disease");

router.get("/", function(req, res){
    Refferal.find({}, function(err, foundPatients){
        if(err){
            console.log(err);
        }else{
            res.render("/refferals/show", {patients: foundPatients});
        }
    });
});

router.get("/new", function(req, res){
          Doctor.find({}, function(err, doctors){
        if(err){
            console.log("Didn't find any doctor.")
        }else{
            Clinic.find({}, function(err, clinics){
                if(err){
                    console.log("There's no clinics");
                }else{
                  Disease.find({}, function(err, diseases){
                      if(err){
                          console.log("No diseases found");
                      }else{
                            res.render("refferals/new", {doctors: doctors, clinics: clinics, diseases: diseases}); 
                      }
                  })
                }
            });
        }
    });
});

module.exports = router;