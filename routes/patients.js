var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    helpers = require("../helpers/patients");

router.route('/', middleware.isLoggedIn)
.get(helpers.newPatient)
.post(helpers.addNewPatient)
//INDEX - ALL PATIENTS
router.route("/index")
.get(helpers.listAllPatients);

// SHOW - ONE PATIENT - ALL INFO
router.route("/:id")
.get(helpers.showPatient)
.put(helpers.updatePatient)
.delete(helpers.deletePatient);
router.route("/:id/refferals/index")
.get(helpers.showAllRefferals);
router.get("/:id/edit", helpers.editPatient);


module.exports = router;