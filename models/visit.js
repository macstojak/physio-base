//WIZYTA REHABILITANTA
var mongoose = require("mongoose"),
    visitSchema = new mongoose.Schema({
        number: Number,
        date: String,
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
        updated_at: String,
        created_at: String
    });
module.exports = mongoose.model("Visit", visitSchema);