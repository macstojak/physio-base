var mongoose = require("mongoose"),
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
module.exports = mongoose.model("UserAddress", useraddressSchema);