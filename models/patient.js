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
            id: mongoose.Schema.Type.ObjectId,
            ref: "PatientAddress"
        }
    });
module.exports = mongoose.model("Patient", patientSchema);