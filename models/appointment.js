//WIZYTA LEKARZA REH

var mongoose = require("mongoose"),
    appointmentSchema = new mongoose.Schema({
        patient: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
            }
        },
        physiotherapist:{
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Phystiotherapist"
            }
        },
        appointmentdate: Date,
        supervisor: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Physiotherapist"
            }
        },
        month: String,
        year: String,
        queue: Number,
        state: String,
        disease: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease"
            }
        }
    });
module.exports = mongoose.model("Appointment", appointmentSchema);