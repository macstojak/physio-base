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
    useraddressSchema =  new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String,
        user: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        }
    });
module.exports = mongoose.model("PatientAddress", patientaddressSchema);
module.exports = mongoose.model("UserAddress", useraddressSchema);