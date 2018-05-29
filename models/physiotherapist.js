var mongoose = require("mongoose"),
    autopopulate = require("mongoose-autopopulate"),
    physiotherapistSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        pesel: String,
        nrpwz: String,
        address: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PhysiotherapistAddress",
                autopopulate: true
        }
    });
    physiotherapistSchema.plugin(autopopulate);
module.exports = mongoose.model("Physiotherapist", physiotherapistSchema);