var express     = require("express"),
    app         = express(),
    passport    = require("passport"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    path = require("path"),
    User = require("./models/user"),
    Patient = require("./models/patient"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash");
    // seedDB();
    
//routes in here VVVV    
var format = 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"';   
var indexRoutes = require("./routes/index"),
    patientRoutes = require("./routes/patients")
mongoose.connect("mongodb://localhost/physio_base");

app.use(bodyParser.urlencoded({extended: true})); //
app.set("view engine", "ejs"); //parse ejs files extentions
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method")); //override method=DELETE or method=PUT
app.use(flash()); //flash messages
app.use(require("express-session")({
    secret: "There you go",
    resave: false,
    saveUninitialized: false
})); //express-session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//STORE LOCAL VARIABLES
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.use("/", indexRoutes);
app.use("/patients", patientRoutes);

//ROUTES
// app.get("/", function(err, req, res){
//     if(err){
//         console.log(err);
//     }
//     res.render("landing");
// });
// app.get("/patients", function(req, res){
//     res.render("patients/index");
// });

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The PhysioBase Server Has Started!");

});


