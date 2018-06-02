var  mongoose = require("mongoose"),
    db = require("../models"),
    ObjectID = mongoose.Types.ObjectId;
     

exports.getAddressForm = function(req, res){
   
     db.Patient.findById(req.params.id)
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
    db.Address.findOneAndUpdate({_id: req.params.address_id}, req.body.address, {new: true})
    .then(function(updatedAddress){
         req.flash("success", "Pomyślnie zmieniono adres");
        res.redirect("/patients/"+req.params.id+"/edit");
    })
    .catch(errorHandlers);
}
exports.deleteAddress =  function(req, res) {
    db.Patient.findOneAndUpdate({_id: req.params.id}, 
    { $pull: {"addresses": {$in: [ObjectID(req.params.address_id)]}}})
    .then(function(patient){
    db.Address.findOneAndRemove(req.params.address_id, function(address){
    
          //  db.patients.update({_id: ObjectId("5a8c1a21610e9e0b45f72c6b")}, 
            // {$pull: {addresses:{$in: [ ObjectId("5b1266692d5fa20ecc88a526")]}}})
            res.redirect("/patients/"+req.params.id);
    })
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