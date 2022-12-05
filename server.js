//Global variables
let {global} = require(`./globalVar.js`);

//Essential modules
var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer  = require('multer');
var path = require('path');
var fs = require("fs");

var session = require(`express-session`);
var fileStore = require(`session-file-store`)(session);
var passport = require(`passport`);
const { v4: uuid } = require('uuid'); uuid(); //const uuid = require(`uuid/v4`);
var LocalStrategy = require('passport-local').Strategy;

console.log(`[server.js] Connecting to server...`);

//Express setup ---------------------------------------
var app = express();
app.use(express.json());
app.use(express.static(__dirname + '/'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log(`[server.js] Set up Express complete`);

//Body parser setup -----------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
console.log(`[server.js] Set up body parser complete`);

//MongoDB ---------------------------------------------
const connectDB = require('./javascripts/mongodb.js');
connectDB();

//User Authentication middleware ----------------------
app.use("/",require("./javascripts/Auth/route"));

//Session preserve-------------------------------------
///*
//Credit: Arjun K S, Medium.com
//https://medium.com/swlh/building-a-simple-web-application-with-node-express-mongodb-dcd53231e83c
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new fileStore(),
    secret: `any key is fine`,
    resave: false,
    saveUninitialized: true
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        loggedInUser = user;
        done(err, user);
    });
});

//*/

//Console Log separator
console.log("---------------------------------------------------------------");



//Web endpoints ---------------------------------------
    //Home page '/'
    app.get('/', function (req, res) {
        res.render("home",{isLogin: global.isLogin, Title: `Home | ${global.siteTitle}`, loginName: global.loginUser.username});

        console.log('[server.js] File: '+__dirname+'/home.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${global.isLogin}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Signin page '/signin'
    app.get('/login', function (req, res) {
        res.render("signin",{Title: `Signin | ${global.siteTitle}`, Message: ``});

        console.log('[server.js] File: '+__dirname+'/signin.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${global.isLogin}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For signin post operations, see auth.js

    //Register page '/register'
    app.get('/register', function (req, res) {
        res.render("signup",{Title: `Register | ${global.siteTitle}`, Message: ``});

        console.log('[server.js] File: '+__dirname+'/signup.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${global.isLogin}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For register post operations, see auth.js

    //Game info page '/game'


//Server listener -------------------------------------
const PORT = 5000;
app.listen(PORT,() =>
    console.log(`[server.js] running at localhost:${PORT}`)
);
process.on("unhandledRejection", err => {
    console.log(`[server.js] Error: ${err.message}`);
    server.close(() => process.exit(1));
});