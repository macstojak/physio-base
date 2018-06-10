var mongoose = require('mongoose');
 mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/physio_base");

mongoose.Promise = Promise;
module.exports.Address = require("./address");
module.exports.Appointment = require("./appointment");
module.exports.Clinic = require("./clinic");
module.exports.Department = require("./department");
module.exports.Disease = require("./disease");
module.exports.Doctor = require("./doctor");
module.exports.Patient = require("./patient");
module.exports.Physiotherapist = require("./physiotherapist");
module.exports.Refferal = require("./refferal");
module.exports.Supervisor = require("./supervisor");
module.exports.User = require("./user");
module.exports.Visit = require("./visit");