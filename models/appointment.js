//WIZYTA LEKARZA REH

var mongoose = require("mongoose"),
    appointmentSchema = new mongoose.Schema({
        physiotherapists:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        appointmentdate: String,
        supervisor: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        },
        month: String,
        year: String,
        queue: Number,
        state: String,
        diseases: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease"
            }
        ]
    });
module.exports = mongoose.model("Appointment", appointmentSchema);