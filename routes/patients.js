var express = require("express"),
    router = express.Router();
    
router.get("/", function(req, res){
    res.render("patients/index");
});
router.get("/new", function(req, res){
    res.render("patients/new")
})
module.exports = router;