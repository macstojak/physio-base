var mongoose = require("mongoose"),
    clinicaddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("ClinicAddress", clinicaddressSchema);