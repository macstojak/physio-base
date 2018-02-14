var express = require("express"),
    router = express.Router({mergeParams: true}),
    Address = require("../models/patientaddress"),
    Patient = require("../models/patient");
    
//ROUTE - NEW
router.get("/new", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            req.flash("Nie można dodać nowego adresu")
            res.redirect("/");
        }else{
             res.render("addresses/new", {patient: foundPatient});
        }
    });
   
});
//ROUTE - NEW POST
router.post("/", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            req.flash("Nie powiodło się dodanie adresu")
            res.redirect("/")
        }else{
            Address.create(req.body.address, function(err, address){
                if(err){
                    console.log(err);
                    res.redirect("/");
                }else{
                var newaddress = new Address({
                patient: foundPatient._id,
                streetname: req.body.streetname,
                nrblock: req.body.nrblock,
                nrflat: req.body.nrflat,
                zipcode: req.body.zipcode,
                town: req.body.town
                })
                
            
               
                console.log("Req.params.id= "+ req.params.id+ " and is of type: "+ typeof req.params.id);
                console.log("address"+address);
                console.log("address.streetname =  "+address.streetname);
                console.log("foundPatient._id= "+ foundPatient._id+ " and is of type: "+ typeof foundPatient._id)
                newaddress.save();
                foundPatient.addresses.push(newaddress);
                foundPatient.save();
                req.flash("success", "Dodano nowy adres");
                res.redirect("edit");
                    
                }
               
            })
               
            
          
        }
    })
})

//ROUTE - EDIT GET FORM

//ROUTE - EDIT SUBMIT FORM

//ROUTE - DELETE

module.exports = router;