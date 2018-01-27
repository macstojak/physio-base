//PACJENT

var mongoose = require("mongoose"),
    patientSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        pesel: String,
        securitynr: String,
        securitydate: Date,
        securityinstance: String,
        phone: String,
        address: {
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PatientAddress"  
            }
        },
        refferal:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Refferal"
            }
        }
        
    });
module.exports = mongoose.model("Patient", patientSchema);