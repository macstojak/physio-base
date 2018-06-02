var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    helpers = require("../helpers/refferals");


//LIST OF ALL REFFERALS - /PATIENTS/SHOW


//CREATE ROUTE - NEW REFFERAL
router.route("/")
.get(helpers.newRefferal)
.post(helpers.addRefferal);
//SHOW REFFERAL
router.route("/:refferalId")
.get(helpers.showRefferal)
.put(helpers.updateRefferal)
.delete(helpers.deleteRefferal)

//SHOW ALL PATIENTS - ALL REFFERALS
router.get("/index", helpers.showAllPatientsAndRefferals);

//EDIT ROUTE - EDIT REFFERAL
router.get("/:refferalId/edit", helpers.editRefferal);



module.exports = router;