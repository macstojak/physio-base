var mongoose = require("mongoose"),
    clinicSchema = new mongoose.Schema({
        name: String,
        regon: String,
        streetname: String,
        streetnr: String,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("Clinic", clinicSchema);