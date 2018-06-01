var mongoose = require("mongoose"),
    db = require("../models");

exports.createAppointment = function(req, res){
    db.Refferal.findById(req.params.id)
    .then(function(foundRefferal){
            db.Physiotherapist.find({})
            .then(function(physiotherapists){
                db.Disease.find({})
                .then(function(diseases){
                    db.Supervisor.find({})
                    .then(function(supervisors){
                        console.log("Physiotherapists: "+ physiotherapists)
                        res.render("appointments/new", {refferal: foundRefferal, physiotherapists: physiotherapists, diseases: diseases, supervisors: supervisors});
                   
                })
            })
            
        })
})
 .catch(errorHandlers)
}

exports.addAppointment = function(req, res){
    db.Refferal.findById(req.params.id)
    .then(function(foundRefferal){
        var diseasesTable = req.body.appointment.diseases,
            physiotherapistsTable = req.body.appointment.physiotherapists,
            diseases = [],
            physiotherapists = [];


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
      
        var newAppointment = {
        appointmentdate: req.body.appointment.appointmentdate,
        month: req.body.appointment.month,
        year: req.body.appointment.year,
        queue: req.body.appointment.queue,
        state: req.body.appointment.state,
        diseases: diseases,
        supervisor: mongoose.Types.ObjectId(req.body.appointment.supervisor),
        physiotherapists: physiotherapists
        }
          
        db.Appointment.create(newAppointment)
        .then(function(appointment){
            appointment.save();
            foundRefferal.appointments.push(appointment._id);
            foundRefferal.save();
             req.flash("success", "Zarejestrowano skierowanie!")
                res.redirect("show");
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
                            res.render("appointments/edit", {appointment: foundAppointment, months: foundAppointment.month, diseases: diseases, physiotherapists: physiotherapists, supervisors: supervisors})    
                            })
                    })
                })
               
            })
    }
exports.updateAppointment = function(req, res){
       db.Appointment.findByIdAndUpdate(req.params.appointmentid, req.body.appointment)
       .then(function(updatedAppointment){
            req.flash("success", "Zmieniono dane na skierowaniu")
            res.redirect(req.session.prevPrevPath);
        })
        .catch(errorHandlers);
}

exports.deleteAppointment = function(req, res){
    db.Refferal.findById(req.params.id) 
    .then(function(refferal){
      db.Appointment.findByIdAndRemove(req.params.appointmentid)
      .then(function(appointment){
          refferal.update({_id: mongoose.Types.ObjectId(req.params.id)}, 
            { $pull: {"appointment._id": mongoose.Types.ObjectId(req.params.appointmentid) }
                
            })
          res.redirect("/patients/"+req.params.id+"/show");
     
      })
    })
}

function errorHandlers(err, req, res, next){
    if(err){
        console.log(err);
         req.flash("error", err);
            res.redirect("back");
    }
}

module.exports = exports;