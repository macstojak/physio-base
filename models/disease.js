//CHOROBY
var mongoose = require("mongoose"),
diseaseSchema = new mongoose.Schema({
        code: String,
        name: String,
        patients:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Patient"
            }
        }
    });
module.exports = mongoose.model("Disease", diseaseSchema);