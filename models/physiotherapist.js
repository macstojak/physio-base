var mongoose= require("mongoose"),
    physiotherapistSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        address: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PhysiotherapistAddress"
            }
        }
    });
module.exports = mongoose.model("Physiotherapist", physiotherapistSchema);