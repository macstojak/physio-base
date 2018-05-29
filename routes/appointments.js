var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    Refferal = require("../models/refferal"),
    Physiotherapist = require("../models/physiotherapist"),
    Disease = require("../models/disease"),
    Supervisor = require("../models/supervisor"), 
    Visit = require("../models/visit"),
    Appointment = require("../models/appointment"),
    Patient = require("../models/patient"),
    helpers = require("../helpers/appointments");
  

//NEW APPOINTMENT
router.route("/")
.get(helpers.createAppointment)
.post(helpers.addAppointment);

router.route("/:appointmentid")
.get(helpers.editAppointment)
.post(helpers.updateAppointment)
.delete(helpers.deleteAppointment);
module.exports = router;    