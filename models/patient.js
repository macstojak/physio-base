//PACJENT

var mongoose = require("mongoose"),
    // deepPopulate = require("mongoose-deep-populate")(mongoose),
    autopopulate = require("mongoose-autopopulate"),
    patientSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        pesel: String,
        securitynr: String,
        securitydate: String,
        securityinstance: ["ZUS", "KRUS", "MSWiA"],
        phone: String,
        addresses:[
                    {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Address",
                    autopopulate: true
                    }
                ],
            
        refferals:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Refferal",
                autopopulate: true
            }
            ],
            
        user:{
            
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                autopopulate: true
            
        }
        
    });
    // patientSchema.plugin(deepPopulate);
    patientSchema.plugin(autopopulate);
    var Patient =  mongoose.model("Patient", patientSchema);
module.exports = Patient;