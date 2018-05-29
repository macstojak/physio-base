var mongoose = require("mongoose"),
    supervisoraddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("SupervisorAddress", supervisoraddressSchema);