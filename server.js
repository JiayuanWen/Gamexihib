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

const User = require('./javascripts/DBmodels/user.js');

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
const Game = require("./javascripts/DBmodels/game");
connectDB();

//Session preserve-------------------------------------
///*
//Credit: Arjun K S, Medium.com
//https://medium.com/swlh/building-a-simple-web-application-with-node-express-mongodb-dcd53231e83c
app.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new fileStore(),
    secret: `what secret`,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
///*
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

//User Authentication middleware ----------------------
app.use("/",require("./javascripts/route"));

//Console Log separator
console.log("---------------------------------------------------------------");



//Web endpoints ---------------------------------------
    //Home page '/'
    app.get('/', function (req, res) {
        req.session.recentUrl = req.url;

        if (req.isAuthenticated()) {
            res.render("home",{isLogin: req.isAuthenticated(), Title: `Home | ${global.siteTitle}`, loginName: req.user.username});
        } else {
            res.render("home",{isLogin: req.isAuthenticated(), Title: `Home | ${global.siteTitle}`});
        }


        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status: ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Signin page '/signin'
    app.get('/login', function (req, res) {
        res.render("signin",{Title: `Signin | ${global.siteTitle}`, Message: ``});

        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status: ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For signin post operations, see auth.js

    //Register page '/register'
    app.get('/register', function (req, res) {
        res.render("signup",{Title: `Register | ${global.siteTitle}`, Message: ``});

        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status: ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For register post operations, see auth.js

    //Game info page '/game'
    app.get('/game', async function (req, res) {
        //See auth.js for implementation
        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //User profile page '/profile'
    app.get('/profile', function (req, res) {
        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");

        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        } else {
            return res.render("profile",{
                Title: `${req.user.username}'s Profile | ${global.siteTitle}`,
                isLogin: req.isAuthenticated(),
                loginName: `${req.user.username}`,
                userName: `${req.user.username}`
            });
        }


    });


    //Error endpoint
    app.get('/err', function (req, res) {
        console.log('[server.js] URL: '+req.url)
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log(`[server.js] Login status ${req.isAuthenticated()}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");

        if (req.isAuthenticated()) {
            res.render("err",{
                isLogin: req.isAuthenticated(),
                Title: `Error | ${global.siteTitle}`,
                loginName: req.user.username,
                errorCode: res.statusCode,
                errorMessage: res.error
            })
        } else {
            res.render("err",{
                isLogin: req.isAuthenticated(),
                Title: `Error | ${global.siteTitle}`,
                errorCode: res.statusCode,
                errorMessage: res.error
            })
        }

    });

//Server listener -------------------------------------
const PORT = 5000;
app.listen(PORT,() =>
    console.log(`[server.js] running at localhost:${PORT}`)
);
process.on("unhandledRejection", err => {
    console.log(`[server.js] Error: ${err.message}`);
    server.close(() => process.exit(1));
});