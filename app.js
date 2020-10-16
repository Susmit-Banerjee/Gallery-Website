var express           =       require("express"),
	app               =       express(),
	bodyParser        =       require("body-parser"),
	mongoose          =       require("mongoose"),
	passport          =       require("passport"),  
	LocalStrategy     =       require("passport-local"),
	Campground        =       require("./models/campground"),
	Comment           =       require("./models/comment"),
	User              =       require("./models/user"),
	flash             =       require("connect-flash"),
	seedDB            =       require("./seeds"),
	methodOverride    =       require("method-override");

var commentRoutes     =       require("./routes/comments"),
	campgroundRoutes  =       require("./routes/campgrounds"),
	indexRoutes       =       require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); seed the database

//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){  //acts a middleware to all the routes, so that it passes currentUser
	res.locals.currentUser = req.user;  // req.user will be empty(undefined) if no one is signed in else it will contain usename
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes); //Takes all the campground routes and appends /campgrounds to all of them

var port = process.env.PORT||3000;
app.listen(port,function(){
	console.log("The YelpCamp Server has been started....");
});