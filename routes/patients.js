var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    helpers = require("../helpers/patients");

router.route('/', middleware.isLoggedIn)
.get(helpers.listPatients)
.post(helpers.addNewPatient)
//INDEX - ALL PATIENTS
router.route("/index", middleware.isLoggedIn)
.get(helpers.listAllPatients)

// SHOW - ONE PATIENT - ALL INFO
router.route("/:id")
.get(helpers.showPatient)
.put(helpers.updatePatient)
.delete(helpers.deletePatient)

router.get("/:id/edit", helpers.editPatient)

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("patients/new");
});


module.exports = router;