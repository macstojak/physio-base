var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    Patient = require("../models/patient"),
    Refferal = require("../models/refferal"),
    Doctor = require("../models/doctor"),
    Clinic = require("../models/clinic"),
    Disease = require("../models/disease");

router.get("/", function(req, res){
    Refferal.find({}, function(err, foundRefferals){
        if(err){
            console.log(err);
        }else{
            res.render("/refferals/show", {refferals: foundRefferals});
        }
    });
});

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


router.post("/", function(req, res){
     
    Patient.findById(req.params.id, function(err, patient){
        if(err){
            console.log(err);
        }else{
            console.log(req.params.id);
            console.dir(req.body.refferal);
            console.log(typeof req.body.refferal.clinic + req.body.refferal.clinic)
            var clinic = new mongoose.Types.ObjectId(req.body.refferal.clinic),
                doctor = mongoose.Types.ObjectId(req.body.refferal.doctor),
                refdate = req.body.refferal.refdate,
                diseaseTable = req.body.refferal.diseases,
                diseases = [];
               for(var i = 0; i<diseaseTable.length; i++){
                   var id = mongoose.Types.ObjectId(diseaseTable[i]);
                   diseases.push(id);
               }
            var newRefferal = {
                refdate: refdate,
                clinic: clinic,
                doctor: doctor,
                diseases: diseases
            };
            
             Refferal.create(newRefferal, function(err, refferal){
            if(err){
                console.log("Something went wrong during registry of new patient");
            }else{
                
                refferal.save();
                patient.refferals.push(refferal._id);
                patient.save();
                req.flash("success", "Zarejestrowano skierowanie!")
                res.redirect("back");
            }
        }); 
        }
      
    });
});

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