//WIZYTA LEKARZA REH

var mongoose = require("mongoose"),
    autopopulate = require("mongoose-autopopulate"),
    appointmentSchema = new mongoose.Schema({
        physiotherapists:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Physiotherapist",
            autopopulate: true
            }
        ],
        appointmentdate: String,
        supervisors: [{
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supervisor",
            autopopulate: true 
        }],
        month: String,
        year: String,
        queue: Number,
        state: String,
        diseases: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease",
            autopopulate: true
            }
        ],
        visits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
            autopopulate: true
        }]
    });
    appointmentSchema.plugin(autopopulate);
module.exports = mongoose.model("Appointment", appointmentSchema);