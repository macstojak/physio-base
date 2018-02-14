var mongoose = require("mongoose"),
    patientaddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String,
        patient:
            {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
            }
        }
    })
module.exports = mongoose.model("PatientAddress", patientaddressSchema);
