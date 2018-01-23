var mongoose= require("mongoose"),
    physiotherapistSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        address: {
            id: mongoose.Schema.Type.ObjectId,
            ref: "PhysiotherapistAddress"
        }
    });
module.exports = mongoose.model("Physiotherapist", physiotherapistSchema);