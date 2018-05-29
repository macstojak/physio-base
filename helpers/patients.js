var  mongoose = require("mongoose"),
    db = ("../models");

exports.listPatients =  function(req, res){
    res.render("patients/show");
}     

exports.listAllPatients =  function(req, res){
    Patient.find({}, function(err, allPatients){
        if(err){
            console.log(err);
        }
        else{
            res.render("patients/index", {patient: allPatients});
        }
    })
}

exports.addNewPatient = function(req, res){
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
}

exports.showPatient = function(req, res){
    //  PIERWSZE ROZWIĄZANIE POPULACJI - DEEP POPULATE PLUGIN
    // Patient.findById(req.params.id).deepPopulate("addresses refferals.diseases refferals.doctor refferals.clinic").exec(function(err, foundPatient){
    //      if(err){
    //         console.log(err);
    //     }else{
    //             console.log(foundPatient.refferals);
    //             res.render("patients/show", {patient: foundPatient, addresses: foundPatient.addresses, clinic: foundPatient.refferals.clinic, doctor: foundPatient.refferals.doctor, refferals:foundPatient.refferals});
    //             }   
    // })
    
    // DRUGIE ROZWIĄZANIE POPULACJI - DEEP POPULATE REMOTE
//     Patient.findById(req.params.id).populate(
//         [{
//             path: "refferals",
//             model: "Refferal",
//             populate: 
//                 {path:"doctor", model: "Doctor"} 
              
//         },
//         {
//             path: "refferals",
//             model: "Refferal",
//             populate:
//                 {path:"clinic", model:"Clinic"}, 
//         },
//         {
//             path: "refferals",
//             model: "Refferal",
//             populate: [
//                 {path:"diseases", model:"Disease"}
//                 ]
//         },
//         {
//           path:"addresses",
//           model:"PatientAddress"
//         }
//         ]
//         ).exec(function(err, foundPatient){
//         if(err){
//             console.log(err);
//         }else{
//                 console.log(foundPatient.refferals);
//                 res.render("patients/show", {patient: foundPatient, addresses: foundPatient.addresses, refferals:foundPatient.refferals});
//                 }
// });

//TRZECIE ROZWIAZANIE - AUTOPOPULATE PLUGIN
Patient.findById(req.params.id, function(err, foundPatient){
         if(err){
            console.log(err);
        }else{
            res.render("patients/show", {patient: foundPatient, addresses: foundPatient.addresses, refferals:foundPatient.refferals});
        }   
    })
}

exports.updatePatient = function(req, res){
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, function(err, updatedPatient){
        if(err){
            console.log("Failed to update patient"+updatedPatient);
            res.redirect("back");
        }
        else{
            res.redirect("/patients/index");
        }
    });
}

exports.deletePatient =  function(req, res){
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
}

exports.editPatient =  function(req, res){
    Patient.findById(req.params.id).populate("addresses").exec(function(err, foundPatient){
        if(err){
            console.log(err);
            res.redirect("patients/index");
        }
            res.render("patients/edit", {patient: foundPatient});
    });
}

function errorHandlers(err, req, res, next){
    if(err){
            console.log(err);
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }
}
module.exports = exports;