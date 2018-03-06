var mongoose = require("mongoose"),
    departmentSchema = new mongoose.Schema({
        depname: String,
        code_VII: String,
        code_VIII: String,
        doctors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Doctor"
            }
            ]
    });

module.exports = mongoose.model("Department", departmentSchema);
    