//CHOROBY
var mongoose = require("mongoose"),
diseaseSchema = new mongoose.Schema({
        code: String,
        name: String
    });
module.exports = mongoose.model("Disease", diseaseSchema);