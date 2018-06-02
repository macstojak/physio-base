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
.get(helpers.editRefferal)
.put(helpers.updateRefferal)
.delete(helpers.deleteRefferal);

//SHOW ALL PATIENTS - ALL REFFERALS
router.route("/index")
.get(helpers.showAllRefferals);

//EDIT ROUTE - EDIT REFFERAL
// router.route("/:refferalId/edit")
// .get(helpers.editRefferal);



module.exports = router;