var mongoose = require("mongoose"),
    doctorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    nrpwz: String
    });

module.exports = mongoose.model("Doctor", doctorSchema);