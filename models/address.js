var mongoose = require("mongoose"),
    patientaddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String,
        patient:{
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
            }
        }
    }),
    physiotherapistaddressSchema =  new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String,
        physiotherapist: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Physiotherapist"
            }
        }
    });
module.exports = mongoose.model("PatientAddress", patientaddressSchema);
module.exports = mongoose.model("PhysiotherapistAddress", physiotherapistaddressSchema);