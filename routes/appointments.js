var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    helpers = require("../helpers/appointments");
  

//NEW APPOINTMENT
router.route("/")
.get(helpers.newAppointment)
.post(helpers.addAppointment);

router.route("/:appointmentid")
.get(helpers.editAppointment)
.put(helpers.updateAppointment)
.delete(helpers.deleteAppointment);

router.route("/:appointmentid/show")
.get(helpers.showOneAppointment)
module.exports = router;    