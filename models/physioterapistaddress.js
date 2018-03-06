var mongoose = require("mongoose"),
    physiotherapistaddressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("PhysiotherapistAddress", physiotherapistaddressSchema);