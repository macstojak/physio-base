var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    Patient = require("../models/patient"),
    Refferal = require("../models/refferal"),
    Doctor = require("../models/doctor"),
    Clinic = require("../models/clinic"),
    Disease = require("../models/disease");

//LIST OF ALL REFFERALS - /PATIENTS/SHOW


//CREATE ROUTE - NEW REFFERAL
router.get("/new", function(req, res){
          Patient.findById(req.params.id, function(err, foundPatient){
              if(err){
                  console.log(err)
              }else{
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
                                            res.render("refferals/new", {patient: foundPatient, doctors: doctors, clinics: clinics, diseases: diseases}); 
                                      }
                                  })
                                }
                            });
                        }
                    });  
              }

          })
         
});

//SHOW REFFERAL
router.get("/:id/show", function(req, res){
    Refferal.findById(req.params.id, function(err, foundRefferal){
        if(err){
            console.log(err);
        }else{
            
            res.render("refferals/show", {refferal: foundRefferal});
        }
    });
});

//SHOW ALL PATIENTS - ALL REFFERALS
router.get("/index", function(req, res){
    Patient.find({}, function(err, foundPatient){
        if(err){
            console.log(err);
        }else{
            console.log(foundPatient)
            res.render("refferals/index", {patients: foundPatient, refferals: foundPatient.refferals});
        }
    });
});


//POST NEW ROUTE - POST NEW REFFERAL
router.post("/", function(req, res){
     
    Patient.findById(req.params.id, function(err, patient){
        if(err){
            console.log(err);
        }else{
          
           console.log(req.body.refferal.diseases)
            var refdate = req.body.refferal.refdate,
                diseaseTable = req.body.refferal.diseases,
                diseases = [];
               for(var i = 0; i<diseaseTable.length; i++){
                   var id = mongoose.Types.ObjectId(diseaseTable[i]);
                   diseases.push(id);
                   console.log(id);
               }
           console.log(diseases);
            var newRefferal = {
                refdate: refdate,
                clinic: req.body.refferal.clinic,
                doctor: req.body.refferal.doctor,
                diseases: diseases
            };
            console.log(newRefferal);
            
             Refferal.create(newRefferal, function(err, refferal){
            if(err){
                console.log("Something went wrong during registry of new patient");
            }else{
                
                refferal.save();
                patient.refferals.push(refferal._id);
                
                patient.save();
                req.flash("success", "Zarejestrowano skierowanie!")
                res.redirect("show");
            }
        }); 
        }
      
    });
});

//EDIT ROUTE - EDIT REFFERAL
router.get("/:refferalId/edit", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            console.log(err);
        }else{
            Refferal.findById(req.params.refferalId, function(err,foundRefferal){
            if(err){
                console.log(err);
            }else{
                
                Doctor.find({},function(err,doctors){
                    Clinic.find({}, function(err,clinics){
                        Disease.find({}, function(err, diseases){
                            
                            res.render("refferals/edit", {patient: foundPatient, refferal: foundRefferal, diseases:diseases, doctors:doctors, clinics: clinics});
                        })
                    })
                })
                
            }
    })
        }
    });
});
//EDIT ROUTE - PUT
router.put("/:refferalid", function(req, res){
    Refferal.findByIdAndUpdate(req.params.refferalid, req.body.refferal, function(err, updatedRefferal){
         if(err){
            console.log("Failed to update refferal"+updatedRefferal);
            res.redirect("back");
        }
        else{
            console.log(req.session.prevPath)
            req.flash("success", "Zmieniono dane na skierowaniu")
            res.redirect(req.session.prevPrevPath);
        }
    })
})

//DELETE ROUTE - REMOVE REFFERAL
router.delete("/:refferalId", function(req, res) {
   
    Patient.findById(req.params.id, function(err, patient){
      Refferal.findByIdAndRemove(req.params.refferalId, function(err, address){
          patient.update({_id: mongoose.Types.ObjectId(req.params.id)}, 
            { $pull: {"refferals._id": mongoose.Types.ObjectId(req.params.refferalId) }}, 
            function(err, val){
                if(err){
                    console.log(val);
                }
            });
            res.redirect("/patients/"+req.params.id+"/show");
      })
    })
});
module.exports = router;