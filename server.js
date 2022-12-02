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

//User model ------------------------------------------


//MongoDB ---------------------------------------------
const connectDB = require('./javascripts/mongodb.js');
connectDB();

//User Authentication middleware ----------------------
app.use("/",require("./javascripts/Auth/route"));

//Log separation
console.log("---------------------------------------------------------------");

//Web endpoints ---------------------------------------
    //Home page '/'
    var siteTitle = "Gamexhibit";
    app.get('/', function (req, res) {
        res.render("home",{Title: `Home | ${siteTitle}`});

        console.log('[server.js] File: '+__dirname+'/home.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Signin page '/signin'
    app.get('/login', function (req, res) {
        res.render("signin",{Title: `Signin | ${siteTitle}`});

        console.log('[server.js] File: '+__dirname+'/signin.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Register page '/register'
    app.get('/register', function (req, res) {
        res.render("signup",{Title: `Register | ${siteTitle}`});

        console.log('[server.js] File: '+__dirname+'/signup.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);;
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
    });

    //Game info page '/game'
    app.get('/game', function (req, res) {
        var gameID = req.query.id;
        var title;
        var desc;
        const Game = require('./javascripts/DBmodels/game');
        Game.findOne({gameID}, function(err, game) {
            title = game.title;
            desc = game.description;
        })

        res.render("game",{Title: `Game | ${siteTitle}`, gameTitle: `${title}`, gameDesc: `${desc}`});

        console.log('[server.js] File: '+__dirname+'/game.ejs')
        console.log(`[server.js] Respond status code: ${res.statusCode}`);
        console.log("[server.js] Cookies:", req.cookies);
        console.log("---------------------------------------------------------------");
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