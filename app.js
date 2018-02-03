var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    path = require("path"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser"),
    Address = require("./models/address"),
    Appointment = require("./models/appointment"),
    Disease = require("./models/disease"),
    Patient = require("./models/patient"),
    User = require("./models/user"),
    Refferal = require("./models/refferal"),
    Visit = require("./models/visit"),
   
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    flash       = require("connect-flash")
    
//routes in here VVVV    
    
// var  indexRoutes = require("./routes/index");
    // patientRoutes = require("./routes/patient"),
    // userRoutes = require("./routes/user");
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
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//STORE LOCAL VARIABLES
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
});


//ROUTES
app.get("/", function(err, req, res){
    if(err){
        console.log(err);
    }
    res.render("landing");
});
// app.get("/patients", function(req, res){
//     res.render("patients/index");
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The PhysioBase Server Has Started!");
});


