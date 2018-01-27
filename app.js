var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
 
    Address = require("./models/address"),
    Appointment = require("./models/appointment"),
    Disease = require("./models/disease"),
    Patient = require("./models/patient"),
    Physiotherapist = require("./models/physiotherapist"),
    Refferal = require("./models/refferal"),
    Visit = require("./models/visit"),
    indexRoutes = require("./routes/index"),
    patientRoutes = require("./routes/patient"),
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    flash       = require("connect-flash")
    
//routes in here VVVV    
    
mongoose.connect("mongodb://localhost/physio_base");

app.use(bodyParser.urlencoded({extended: true})); //
app.set("view engine", "ejs"); //parse ejs files extentions
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //override method=DELETE or method=PUT
app.use(flash()); //flash messages
 


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "There you go",
    resave: false,
    saveUninitialized: false
})); //express-session
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.Authenticate()));
// passport.serializeUser(User.serializeUser);
// passport.deserializeUser(User.deserializeUser);

//STORE LOCAL VARIABLES
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
// });

//USE PREDEFINED ROUTES
app.use("/", indexRoutes);
app.use("/patients", patientRoutes);

//ROUTES
// app.get("/", function(req, res){
//     res.render("landing");
// });
// app.get("/patients", function(req, res){
//     res.render("patients/index");
// });
    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});


