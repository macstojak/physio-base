//WIZYTA REHABILITANTA
var mongoose = require("mongoose"),
    visitSchema = new mongoose.Schema({
        number: Number,
        date: Date,
        patient:{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Patient"
            }
        },
        physiotherapist: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        },
        description: String,
        updated_at: Date,
        created_at: Date
    });
module.exports = mongoose.model("Visit", visitSchema);