//SKIEROWANIE LEKARZA POZ

var mongoose = require("mongoose"),
    refferalSchema = new mongoose.Schema({
        clinicname: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Clinic"
            }
        },
        refdate: String,
        doctor: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Doctor"
            }
        },
        diseases: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease"
            }],
        appointments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }]
    });
module.exports = mongoose.model("Refferal", refferalSchema);