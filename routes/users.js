var express = require("express"),
    router = express.Router();
    
    router.get("/", function(req,res){
        res.render("/user");
    });
    router.get("/new", function(req,res){
        res.send("New user");
    });
module.exports = router;
    
    