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
module.exports.PatientAddress = require("./patientaddress");
module.exports.Phystiotherapist = require("./physiotherapist");
module.exports.PhysiotherapistAddress = require("./physiotherapistaddress");
module.exports.Refferal = require("./refferal");
module.exports.Supervisor = require("./supervisor");
module.exports.SupervisorAddress = require("./supervisoraddress");
module.exports.User = require("./user");
module.exports.UserAddress = require("./useraddress");
module.exports.Visit = require("./visit");