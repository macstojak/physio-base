var  mongoose = require("mongoose"),
    db = ("../models");
     

exports.getAddressForm = function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
     db.Patient.findById(id)
        .then(function(foundPatient){
             res.render("addresses/new", {patient: foundPatient});
             
        })
        .catch(function(error){
            console.log(error);
        });
    };
exports.createNewAddress =  function(req, res){
    db.Patient.findById(req.params.id)
        .then(function(foundPatient){
            db.Address.create(req.body.address)
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
    db.Address.findById(req.params.address_id) 
    .then(function(foundAddress){
            res.render("addresses/edit", {patient_id: req.params.id, address: foundAddress});
        
    })
    .catch(errorHandlers);
};

exports.updateAddress = function(req, res){
    db.Address.findByIdAndUpdate(req.params.address_id, req.body.address)
    .then(function(updatedAddress){
         req.flash("success", "Pomyślnie zmieniono adres");
        res.redirect("/patients/"+req.params.id+"/edit");
    })
    .catch(errorHandlers);
}
exports.deleteAddress =  function(req, res) {
    var ObjectID = new mongoose.Types.ObjectId;
   db.Patient.findById(req.params.id)
    .then(function(patient){
     db.Address.findByIdAndRemove(req.params.addressId)
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