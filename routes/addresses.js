var express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router({mergeParams: true}),
    helpers = require("../helpers/addresses");
    
//ROUTE - NEW
// router.route("/")
// .get(helpers.getAddressForm)
// .post(helpers.createNewAddress);

router.route("/:address_id")
.get(helpers.editAddress)
.put(helpers.updateAddress)
.delete(helpers.deleteAddress);

module.exports = router;