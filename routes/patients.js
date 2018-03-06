var express = require("express"),
    Patient = require("../models/patient"),
    Address= require("../models/patientaddress"),
    Refferal = require("../models/refferal"),
    middleware = require("../middleware"),
    router = express.Router({mergeParams: true});

router.get('/', function(req, res){
    res.render("patients/show");
});   
//INDEX - ALL PATIENTS
router.get("/index", middleware.isLoggedIn, function(req, res){
    Patient.find({}, function(err, allPatients){
        if(err){

            console.log(err);
        }
        else{
            
            res.render("patients/index", {patient: allPatients});
        }
    });
});
// SHOW - ONE PATIENT - ALL INFO
router.get("/:id/show", middleware.isLoggedIn, function(req, res){
    Patient.findById(req.params.id).populate("addresses refferals").exec(function(err, foundPatient){
        if(err){
            console.log(err);
        }
            res.render("patients/show", {patient: foundPatient});
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("patients/new");
});
router.post("/",  middleware.isLoggedIn, function(req, res){
    var firstname = req.body.firstname,
        lastname = req.body.lastname,
        pesel = req.body.pesel,
        phone = req.body.phone,
        securitynr = req.body.securitynr,
        securitydate = req.body.securitydate,
        securityinstance = req.body.securityinstance,
        user= req.body.user;
        
    var newPatient = {
                        firstname: firstname, 
                        lastname: lastname, 
                        pesel: pesel, 
                        phone: phone,
                        securitynr: securitynr, 
                        securitydate: securitydate, 
                        securityinstance: securityinstance, 
                        user:user,
                    
                     };
        Patient.create(newPatient, function(err, patient){
            if(err){
                console.log("Something went wrong during registry of new patient");
            }else{
                console.log(patient);
                req.flash("success", "Zarejestrowano pacjenta!")
                res.redirect("patients/index");
            }
        });
    
    
});

router.get("/:id/edit", function(req, res){
    Patient.findById(req.params.id).populate("addresses").exec(function(err, foundPatient){
        if(err){
            console.log(err);
            res.redirect("patients/index");
        }
            res.render("patients/edit", {patient: foundPatient});
    });
});

router.put("/:id", function(req, res){
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, function(err, updatedPatient){
        if(err){
            console.log("Failed to update patient"+updatedPatient);
            res.redirect("back");
        }
        else{
            res.redirect("/patients/index");
        }
    });
});

router.delete("/:patient_id", function(req, res){
    Patient.findByIdAndRemove(req.params.patient_id, function(err){
        if(err){
            req.flash("error", "Nie można usunąć pacjenta");
            res.redirect("back");
        }
        else{
            req.flash("success", "Pomyślnie usunięto pacjenta z rejestru")
            res.redirect("/");
        }
    })
});

module.exports = router;