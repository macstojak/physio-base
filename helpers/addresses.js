var  mongoose = require("mongoose"),
     Patient = require("../models/patient"),
     Address = require("../models/patientaddress");
     

exports.getAddressForm = function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
     Patient.findById(id)
        .then(function(foundPatient){
             res.render("addresses/new", {patient: foundPatient});
             
        })
        .catch(function(error){
            console.log(error);
        });
    };
exports.createNewAddress =  function(req, res){
    Patient.findById(req.params.id)
        .then(function(foundPatient){
            Address.create(req.body.address)
            .then(function(address){
                address.save();
                foundPatient.addresses.push(address._id);
               foundPatient.save();
                req.flash("success", "Dodano nowy adres");
                res.redirect("back");
            });
        })
        .catch(errorHandlers);
        };

exports.editAddress = function(req,res){
    Address.findById(req.params.address_id) 
    .then(function(foundAddress){
            res.render("addresses/edit", {patient_id: req.params.id, address: foundAddress});
        
    })
    .catch(errorHandlers);
};

exports.updateAddress = function(req, res){
    Address.findByIdAndUpdate(req.params.address_id, req.body.address)
    .then(function(updatedAddress){
         req.flash("success", "Pomyślnie zmieniono adres");
        res.redirect("/patients/"+req.params.id+"/edit");
    })
    .catch(errorHandlers);
}
exports.deleteAddress =  function(req, res) {
    var ObjectID = new mongoose.Types.ObjectId;
    Patient.findById(req.params.id)
    .then(function(patient){
      Address.findByIdAndRemove(req.params.addressId)
      .then(function(address){
          patient.update({_id: mongoose.Types.ObjectId(req.params.id)}, 
            { $pull: {"refferal._id": mongoose.Types.ObjectId(req.params.addressId) }})
            res.redirect("/patients/"+req.params.id+"/show");
      })
    })
    .catch(errorHandlers);
};

function errorHandlers(err, req, res, next){
    if(err){
            console.log(err);
            req.flash("Nie można dodać nowego adresu");
            res.redirect("/");
        }
}
module.exports = exports;