var  mongoose = require("mongoose"),
    db = require("../models");

exports.newPatient = function(req, res){
    res.render("patients/new");
}
exports.listAllPatients =  function(req, res){
    db.Patient.find({})
    .then(function(allPatients){
        console.log(allPatients)
          res.render("patients/index", {patient: allPatients});
    })
    .catch(errorHandlers);
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
        db.Patient.create(newPatient)
        .then(function(patient){
                req.flash("success", "Zarejestrowano pacjenta!")
                res.render("patients/index");
        })
        .catch(errorHandlers);
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
db.Patient.findById(req.params.id)
    .then(function(foundPatient){
        console.log(foundPatient.addresses)
        console.log(foundPatient.refferals)
            res.render("patients/show", {patient: foundPatient, addresses: foundPatient.addresses, refferals:foundPatient.refferals});
    })
    .catch(errorHandlers);
}

exports.updatePatient = function(req, res){
   db.Patient.findByIdAndUpdate(req.params.id, req.body.patient)
   .then(function(updatedPatient){
            res.redirect("/patients/index");
    })
    .catch(errorHandlers);
}

exports.deletePatient =  function(req, res){
    db.Patient.findByIdAndRemove(req.params.id)
    .then(function(){
            req.flash("success", "Pomyślnie usunięto pacjenta z rejestru")
            res.redirect("/");
    })
    .catch(errorHandlers);
}

exports.editPatient =  function(req, res){
    db.Patient.findById(req.params.id).populate("addresses").exec(function(err, foundPatient){
        if(err){
            console.log(err);
            res.redirect("patients/index");
        }
            res.render("patients/edit", {patient: foundPatient});
    });
}
// exports.showRefferal = function(req, res){
//     db.Refferal.findById(req.params.id)
//     .then(function(foundRefferal){
//             res.render("refferals/show", {refferal: foundRefferal});
//     })
//     .catch(errorHandlers);
// }
exports.showAllRefferals = function(req, res){
    db.Patient.find({})
    .then(function(patients){
        res.render("refferals/index", {patients: patients, refferals: patients.refferals});
    })
}

function errorHandlers(err, req, res, next){
    if(err){
            console.log(err);
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }
}
module.exports = exports;