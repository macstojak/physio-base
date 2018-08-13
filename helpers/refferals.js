var mongoose = require("mongoose"),
    db = require("../models"),
    ObjectID = mongoose.Types.ObjectId;
    
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
                res.redirect("/patients/"+req.params.id);
            })

          })
          .catch(errorHandlers);
}

exports.updateRefferal = function(req, res){
    db.Refferal.findByIdAndUpdate(req.params.refferalId, req.body.refferal, { new: true, overwrite: true, upsert: false })
    .then(function(updatedRefferal){
            console.log(req.session.prevPath)
            req.flash("success", "Zmieniono dane na skierowaniu")
            res.redirect(req.session.prevPath);
    })
    .catch(errorHandlers);
}
exports.deleteRefferal = function(req, res) {
    db.Patient.findOneAndUpdate({_id: req.params.id}, 
            { $pull: {"refferals": {$in: [ObjectID(req.params.refferalId)]} }})
    .then(function(patients){
      db.Refferal.findByIdAndRemove(req.params.refferalId)
      .then(function(refferal){
            res.redirect("/patients/"+req.params.id);
    })
    })
    .catch(errorHandlers);
}

exports.showAllRefferals = function(req, res){
   db.Patient.find({})
   .then(function(foundPatient){
       console.log(foundPatient.refferals)
            res.render("refferals/index", {patients: foundPatient});
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
                            res.render("refferals/edit", {patient: foundPatient, refferal: foundRefferal, diseases: diseases, doctors: doctors, clinics: clinics});
                        })
                    })
                })
            })
    })
    .catch(errorHandlers);
}

exports.showOneRefferal =  function(req, res){
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
                            res.render("refferals/show", {patient: foundPatient, refferal: foundRefferal, diseases: diseases, doctors: doctors, clinics: clinics});
                        })
                    })
                })
            })
    })
    .catch(errorHandlers);
}
// exports.newAppointment = function(req, res){

//       db.Refferal.findById(req.params.refferalId, function(foundRefferal){
//           db.Physiotherapist.find(function(physiotherapists){
//                 db.Disease.find(function(diseases){
//                     db.Supervisor.find(function(supervisors){
//             console.log("physiotherapists:" + physiotherapists);
            
//         res.render("appointments/new", {
//         refferal: foundRefferal, 
//         physiotherapists: physiotherapists, 
//         diseases: diseases, 
//         supervisors: supervisors
            
//         })

   
//     })
    
//     })
   
//     })
    
             
//       })
//  .catch(errorHandlers)
// }


function errorHandlers(err, req, res, next){
    if(err){
            console.log(err);
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }
}
module.exports = exports;