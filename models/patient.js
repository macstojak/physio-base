//PACJENT

var mongoose = require("mongoose"),
    patientSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        pesel: String,
        securitynr: String,
        securitydate: String,
        securityinstance: ["ZUS", "KRUS", "MSWiA"],
        phone: String,
        addresses: [
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PatientAddress"  
                }
            ],
            
        refferal:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Refferal"
            }
            ],
        
        user:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
        
    });
module.exports = mongoose.model("Patient", patientSchema);