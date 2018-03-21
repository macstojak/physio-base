//SKIEROWANIE LEKARZA POZ

var mongoose = require("mongoose"),
    autopopulate = require("mongoose-autopopulate"),
    refferalSchema = new mongoose.Schema({
        clinic: {
            
                type: mongoose.Schema.Types.ObjectId,
                ref: "Clinic",
                autopopulate: true
            
        },
        refdate: String,
        doctor: {
            
                type: mongoose.Schema.Types.ObjectId,
                ref: "Doctor",
                autopopulate: true
            
        },
        diseases: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disease",
                autopopulate: true
            }],
        appointments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
                autopopulate: true
        }]
    });
    refferalSchema.plugin(autopopulate);
module.exports = mongoose.model("Refferal", refferalSchema);