var mongoose = require("mongoose"),
    db = require("../models");

exports.newAppointment = function(req, res){
    db.Patient.findById(req.params.id)
    .then(function(foundPatient){
         db.Refferal.findById(req.params.refferalId)
        .then(function(foundRefferal){
            db.Physiotherapist.find({})
            .then(function(physiotherapists){
                db.Disease.find({})
                .then(function(diseases){
                    db.Supervisor.find({})
                    .then(function(supervisors){
                        console.log("Patient: "+ foundPatient)
                        res.render("appointments/new", {patient: foundPatient, refferal: foundRefferal, physiotherapists: physiotherapists, diseases: diseases, supervisors: supervisors});
                   
                })
            })
            
        })
})
    })
   
 .catch(errorHandlers)
}

exports.addAppointment = function(req, res){
    db.Refferal.findById(req.params.refferalId)
    .then(function(foundRefferal){
        var diseasesTable = req.body.appointment.diseases,
            physiotherapistsTable = req.body.appointment.physiotherapists,
            supervisorsTable = req.body.appointment.supervisors,
            diseases = [],
            physiotherapists = [],
            supervisors = [];


        if(!(diseasesTable === undefined)){
            if(Array.isArray(diseasesTable) && diseasesTable.length > 1){
                for(var i = 0; i<diseasesTable.length; i++){
                           var id = mongoose.Types.ObjectId(diseasesTable[i]);
                           diseases.push(id);
                       }
            }else{
             diseases =  mongoose.Types.ObjectId(diseasesTable); 
            }
        }else{
            diseases = [];
        }
        if(!(physiotherapistsTable === undefined)){
            if(Array.isArray(physiotherapistsTable) && physiotherapistsTable.length > 1){
                for(var i = 0; i<physiotherapistsTable.length; i++){
                           var id = mongoose.Types.ObjectId(physiotherapistsTable[i]);
                           physiotherapists.push(id);
                }
                }else{
             physiotherapists =  mongoose.Types.ObjectId(physiotherapistsTable) 
            }
            
        }else{
                physiotherapists = [];
            }
            
         if(!(supervisorsTable === undefined)){
            if(Array.isArray(supervisorsTable) && supervisorsTable.length > 1){
                for(var i = 0; i<supervisorsTable.length; i++){
                           var id = mongoose.Types.ObjectId(supervisorsTable[i]);
                           supervisors.push(id);
                }
                }else{
             supervisors =  mongoose.Types.ObjectId(supervisorsTable) 
            }
            
        }else{
                supervisors = [];
            }
      
        var newAppointment = {
        appointmentdate: req.body.appointment.appointmentdate,
        month: req.body.appointment.month,
        year: req.body.appointment.year,
        queue: req.body.appointment.queue,
        state: req.body.appointment.state,
        diseases: diseases,
        supervisors: supervisors,
        physiotherapists: physiotherapists
        }
         
        db.Appointment.create(newAppointment)
        .then(function(appointment){
            
            appointment.save();
            foundRefferal.appointments.push(appointment._id);
            foundRefferal.save();
             req.flash("success", "Zarejestrowano skierowanie!")
                res.redirect("/appointments/index");
            })
        })
        .catch(errorHandlers)
    }
exports.editAppointment = function(req, res){
    db.Appointment.findById(req.params.appointmentid)
    .then(function(foundAppointment){
                db.Physiotherapist.find({})
                .then(function(physiotherapists){
                    db.Disease.find({})
                    .then(function(diseases){
                        db.Supervisor.find({})
                        .then(function(supervisors){
                            console.log(supervisors)
                            res.render("appointments/edit", {appointment: foundAppointment, months: foundAppointment.month, diseases: diseases, physiotherapists: physiotherapists, supervisors: supervisors})    
                            })
                    })
                })
               
            })
    }
exports.updateAppointment = function(req, res){
       db.Appointment.findByIdAndUpdate(req.params.appointmentid, req.body.appointment)
       .then(function(updatedAppointment){
           console.log("UPDATE FORM PHYSIOTHERAPIST: "); console.dir(req.body.appointment)
            req.flash("success", "Zmieniono dane na skierowaniu")
            res.redirect(req.session.prevPrevPath);
        })
        .catch(errorHandlers);
}

exports.deleteAppointment = function(req, res){
    db.Refferal.findById(req.params.refferalId) 
    .then(function(refferal){
      db.Appointment.findByIdAndRemove(req.params.appointmentid)
      .then(function(appointment){
          refferal.update({_id: mongoose.Types.ObjectId(req.params.refferalId)}, 
            { $pull: {"appointment._id": mongoose.Types.ObjectId(req.params.appointmentid) }
                
            })
          res.redirect("/patients/"+req.params.id+"/show");
     
      })
    })
}
exports.showOneAppointment = function(req, res){
    db.Patient.findById(req.params.id)
    .then(function(patient){
        db.Refferal.findById(req.params.refferalId)
        .then(function(refferal){
            db.Appointment.findById(req.params.appointmentid)
            .then(function(appointment){
              db.Disease.find({})
              .then(function(diseases){
                  db.Physiotherapist.find({})
                  .then(function(physiotherapists){
                      db.Supervisor.find({})
                      .then(function(supervisors){
                          res.render("appointments/show", {patient: patient, refferal: refferal, 
                          appointment: appointment, diseases: diseases, physiotherapists: physiotherapists, supervisors: supervisors})
                      })
                  })
              })
            })
            })
        })
    }

// exports.newAppointment = function(req, res){

//       db.Refferal.findById(req.params.refferalId, function(foundRefferal){
//           db.Physiotherapist.find({}, function(physiotherapists){
//                 db.Disease.find({}, function(diseases){
//                     db.Supervisor.find({}, function(supervisors){
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
         req.flash("error", err);
            res.redirect("back");
    }
}

module.exports = exports;