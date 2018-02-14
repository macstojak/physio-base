//SKIEROWANIE LEKARZA POZ

var mongoose = require("mongoose"),
    refferalSchema = new mongoose.Schema({
        clinicname: String,
        refdate: String,
        doctor: String,
        license: String,
        disease: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease"
            }
        }
    });
module.exports = mongoose.model("Refferal", refferalSchema);