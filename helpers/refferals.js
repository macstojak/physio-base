var mongoose = require("mongoose"),
    db = require("../models");
    
exports.newRefferal = function(req, res){
          db.Patient.findById(req.params.id)
          .then(function(foundPatient){
                    db.Doctor.find({})
                    .then(function(doctors){
                            db.Clinic.find({})
                            .then(function(clinics){
                                  db.Disease.find({})
                                  .then(function(diseases){
                                            res.render("refferals/new", {patient: foundPatient, doctors: doctors, clinics: clinics, diseases: diseases}); 
                                      })
                            })
                    }); 
          })
          .catch(errorHandlers);
         
}

exports.addRefferal =  function(req, res){
    db.Patient.findById(req.params.id)
    .then(function(patient){
                var refdate = req.body.refferal.refdate,
                diseaseTable = req.body.refferal.diseases,
                diseases = [];
                if(!(diseaseTable===undefined)){
                    if(Array.isArray(diseaseTable) && diseaseTable.length >1){
                           for(var i = 0; i<diseaseTable.length; i++){
                               var id = mongoose.Types.ObjectId(diseaseTable[i]);
                               diseases.push(id);
                               console.log(id);
                           }
                    }else{
                     diseases =  mongoose.Types.ObjectId(diseaseTable) 
                    }
                }else{
                     diseases = [];
                }
                var newRefferal = {
                refdate: refdate,
                clinic: req.body.refferal.clinic,
                doctor: req.body.refferal.doctor,
                diseases: diseases
                };
          
             db.Refferal.create(newRefferal)
             .then(function(refferal){
                refferal.save();
                patient.refferals.push(refferal._id);
                patient.save();
                req.flash("success", "Zarejestrowano skierowanie!");
                res.redirect("show");
            })

          })
          .catch(errorHandlers);
}
exports.showRefferal = function(req, res){
    db.Refferal.findById(req.params.id)
    .then(function(foundRefferal){
            res.render("refferals/show", {refferal: foundRefferal});
    })
    .catch(errorHandlers);
}
exports.editRefferal = function(req, res){
    db.Refferal.findByIdAndUpdate(req.params.refferalid, req.body.refferal)
    .then(function(updatedRefferal){
            console.log(req.session.prevPath)
            req.flash("success", "Zmieniono dane na skierowaniu")
            res.redirect(req.session.prevPrevPath);
    })
    .catch(errorHandlers);
}
exports.deleteRefferal = function(req, res) {
    db.Patient.findById(req.params.id_)
    .then(function(patient){
      db.Refferal.findByIdAndRemove(req.params.refferalId)
      .then(function(address){
          patient.update({_id: mongoose.Types.ObjectId(req.params.id)}, 
            { $pull: {"refferals._id": mongoose.Types.ObjectId(req.params.refferalId) }});
            res.redirect("/patients/"+req.params.id+"/show");
      })
    })
    .catch(errorHandlers);
}

exports.showAllPatientsAndRefferals = function(req, res){
   db.Patient.find({})
   .then(function(foundPatient){
            res.render("refferals/index", {patients: foundPatient, refferals: foundPatient.refferals});
    })
    .catch(errorHandlers);
}

exports.editRefferal =  function(req, res){
    db.Patient.findById(req.params.id)
    .then(function(foundPatient){
            db.Refferal.findById(req.params.refferalId)
            .then(function(foundRefferal){
               db.Doctor.find({})
                .then(function(doctors){
                    db.Clinic.find({})
                    .then(function(clinics){
                        db.Disease.find({})
                        .then(function(diseases){
                            res.render("refferals/edit", {patient: foundPatient, refferal: foundRefferal, diseases:diseases, doctors:doctors, clinics: clinics});
                        })
                    })
                })
            })
    })
    .catch(errorHandlers);
}

function errorHandlers(err, req, res, next){
    if(err){
            console.log(err);
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }
}
module.exports = exports;