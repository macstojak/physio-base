var express = require("express"),
    router = express.Router({mergeParams: true}),
    Refferal = require("../models/refferal"),
    Physiotherapist = require("../models/physiotherapist"),
    Disease = require("../models/disease")
    
    
//NEW APPOINTMENT
router.get("/new", function(req, res){
    Refferal.findById(req.params.id, function(err, foundRefferal){
        if(err){
            console.log(err);
        }else{
            Physiotherapist.find({}, function(err, physiotherapists){
                Disease.find({}, function(err, diseases){
                    console.log(physiotherapists)
                    
                        res.render("appointments/new", {refferal: foundRefferal, physiotherapists: physiotherapists, diseases: diseases, supervisors: physiotherapists});
                    
                })
            })
            
        }
    });
});


module.exports = router;    