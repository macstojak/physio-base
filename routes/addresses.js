var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    Address = require("../models/patientaddress"),
    Patient = require("../models/patient");
    
//ROUTE - NEW
router.get("/new", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }else{
             res.render("addresses/new", {patient: foundPatient});
        }
    });
});
//ROUTE - NEW ADDRESS
router.post("/", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            req.flash("Nie powiodło się dodanie adresu");
            res.redirect("/");
        }else{
            Address.create(req.body.address, function(err, address){
                if(err){
                    console.log(err);
                    res.redirect("/");
                }else{
                
                address.save();
                foundPatient.addresses.push(address._id);
               foundPatient.save();
                req.flash("success", "Dodano nowy adres");
                res.redirect("edit");
                }
            });
        }
    });
});

//ROUTE - EDIT GET FORM
router.get("/:address_id/edit", function(req,res){
    Address.findById(req.params.address_id, function(err, foundAddress) {
        if(err){
            req.flash("error", "Nie znaleziono adresu");
            res.redirect("back");
        }else{
            res.render("addresses/edit", {patient_id: req.params.id, address: foundAddress});
        }
    });
});


//ROUTE - EDIT SUBMIT FORM
router.put("/:address_id", function(req, res){
    Address.findByIdAndUpdate(req.params.address_id, req.body.address, function(err){
    if(err){
        req.flash("error", "Nie znaleziono adresu")
        res.redirect("/");
    }else{
         req.flash("success", "Pomyślnie zmieniono adres");
        res.redirect("/patients/"+req.params.id+"/edit");
    }
    });
});
//ROUTE - DELETE
router.delete("/:addressId", function(req, res) {
    var ObjectID = new mongoose.Types.ObjectId;
    Patient.findById(req.params.id, function(err, patient){
        if(err){
            console.log("oops");
        }else{
            patient.update({_id: new ObjectID(req.params.id)}, 
            { $pull: {"addresses._id": new ObjectID(req.params.addressId) }}, 
            function(err, val){
                if(err){
                    console.log(val);
                }
            });
        }
    })
});

module.exports = router;