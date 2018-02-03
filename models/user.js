var mongoose= require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    userSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        address: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAddress"
            }
        }
    });
    userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);