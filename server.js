//Global variables
let {siteTitle,isLogin,loginUser} = require(`./globalVar.js`);

//Essential modules
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require('path');
var fs = require("fs");

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

//Log separation
console.log("---------------------------------------------------------------");

//Web endpoints ---------------------------------------
    //Home page '/'
    app.get('/', function (req, res) {
        res.render("home",{Title: `Home | ${siteTitle}`});

        console.log('[server.js] File: '+__dirname+'/home.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Signin page '/signin'
    app.get('/login', function (req, res) {
        res.render("signin",{Title: `Signin | ${siteTitle}`, Message: ``});

        console.log('[server.js] File: '+__dirname+'/signin.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For signin post operations, see auth.js

    //Register page '/register'
    app.get('/register', function (req, res) {
        res.render("signup",{Title: `Register | ${siteTitle}`, Message: ``});

        console.log('[server.js] File: '+__dirname+'/signup.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });
    //For signin register operations, see auth.js

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