var express = require("express"),
    Patient = require("../models/patient"),
    middleware = require("../middleware"),
    router = express.Router();
    
router.get("/", middleware.isLoggedIn, function(req, res){
    res.render("patients/show");
});
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("patients/new")
});
router.post("/new",  middleware.isLoggedIn, function(req, res){
    var firstname = req.body.firstname,
        lastname = req.body.lastname,
        phone = req.body.phone,
        securitynr = req.body.securitynr,
        securitydate = req.body.securitydate,
        securityinstance = req.securityinstance;
    var newPatient = {firstname: firstname, lastname: lastname, phone: phone,securitynr: securitynr, securitydate: securitydate, securityinstance: securityinstance};
        Patient.create(newPatient, function(err, patient){
            if(err){
                console.log("Something went wrong during registry of new patient");
            }else{
                console.log(patient);
                res.redirect("/show");
            }
        });
    
    
});

router.get("/edit", middleware.checkOwnershipPatient, function(req, res){
    
})
module.exports = router;