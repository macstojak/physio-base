var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/physio_base");

mongoose.Promise = Promise;

module.exports.Address = require("./address");
module.exports.Appointment = require("./appointment");