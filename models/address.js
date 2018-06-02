var mongoose = require("mongoose"),
    addressSchema = new mongoose.Schema({
        streetname: String,
        nrblock: Number,
        nrflat: Number,
        zipcode: String,
        town: String
    });
module.exports = mongoose.model("Address", addressSchema);
