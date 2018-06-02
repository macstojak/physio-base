var mongoose = require("mongoose"),
    autopopulate = require("mongoose-autopopulate"),
    supervisorSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        pesel: String,
        nrpwz: String,
        address: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
                autopopulate: true
        }
    });
    supervisorSchema.plugin(autopopulate);
module.exports = mongoose.model("Supervisor", supervisorSchema);