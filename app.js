var express     = require("express"),
 methodOverride = require("method-override"),
    app         = express(),
    passport    = require("passport"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    LocalStrategy = require("passport-local"),
    path = require("path"),
    User = require("./models/user"),
    Patient = require("./models/patient"),
    Address = require("./models/patientaddress"),
    Refferal = require("./models/refferal"),
    Appointment = require("./models/appointment"),
    seedDB      = require("./seeds"),
    expressBack = require("express-back"),
    flash       = require("connect-flash");
    // seedDB();
   
//routes in here VVVV    

var indexRoutes = require("./routes/index"),
    patientRoutes = require("./routes/patients"),
    addressRoutes = require("./routes/addresses"),
    appointmentRoutes = require("./routes/appointments"),
    refferalRoutes = require("./routes/refferals");
    


app.use(bodyParser.urlencoded({extended: true})); //
app.set("view engine", "ejs"); //parse ejs files extentions
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method")); //override method=DELETE or method=PUT
app.use(flash()); //flash messages
app.use(require("express-session")({
    secret: "There you go",
    resave: false,
    saveUninitialized: false
})); //express-session
app.use(expressBack());
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
app.use("/patients/:id/addresses", addressRoutes);
app.use("/refferals", refferalRoutes);
app.use("/refferals/:id", refferalRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/patients/:id/refferals", refferalRoutes);
app.use("/refferals/:id/appointments", appointmentRoutes);



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


