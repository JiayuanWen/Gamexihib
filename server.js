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
app.use(express.static('public'));
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
app.use("/api/auth",require("./javascripts/Auth/route"));

//Web endpoints ---------------------------------------
    //Home page '/'
    app.get('/', function (req, res) {
        res.sendFile(__dirname+'/home.html');

        console.log('[server.js] URL: '+__dirname+'/home.html');
        console.log("[server.js] ", req.cookies);
    });

    //Register page '/register'


//Server listener -------------------------------------
const PORT = 5000;
app.listen(PORT,() =>
    console.log(`[server.js] running at localhost:${PORT}`)
);
process.on("unhandledRejection", err => {
    console.log(`[server.js] Error: ${err.message}`);
    server.close(() => process.exit(1));
});