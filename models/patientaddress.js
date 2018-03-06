var mongoose = require("mongoose"),
    patientaddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("PatientAddress", patientaddressSchema);
