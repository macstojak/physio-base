var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Physiotherapist = require("./models/physiotherapist"),
    Address = require("./models/address"),
    Patient = require("./models/patient"),
    
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    flash       = require("connect-flash")
    
//routes in here VVVV    
    
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true})); //
app.set("view engine", "ejs"); //parse ejs files extentions
app.use(express.static(__dirname+"/public")); 
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
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
});

//USE PREDEFINED ROUTES
app.use("/", indexRoutes);
app.use("/")
    