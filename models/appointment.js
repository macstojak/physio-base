var mongoose = require("mongoose"),
    appointmentSchema = new mongoose.Schema({
        patient: {
            id: mongoose.Object.Type.ObjectId,
            ref: "Patient"
        },
        physiotherapist:{
            id: mongoose.Object.Type.ObjectId,
            ref: "Phystiotherapist"
        },
        appointmentdate: Date,
        supervisor: {
            id: mongoose.Object.Type.ObjectId,
            ref: "Physiotherapist"
        },
        month: String,
        year: String,
        queue: Number,
        state: String,
        disease: 
    })