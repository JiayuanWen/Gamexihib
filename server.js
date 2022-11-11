var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require('path');
var fs = require("fs");
const mongoose = require('mongoose');

//Express setup ---------------------------------------
var app = express();
app.use(express.static('public'));

//Body parser setup -----------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//User model ------------------------------------------


//Mongo DB --------------------------------------------


//Web endpoints ---------------------------------------

//Home page '/'
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/home.html');

    console.log(__dirname+'/home.html');
    console.log("Cookies: ", req.cookies);
    console.log("")
});

//Server listener
const PORT = 5000;
app.listen(PORT,() => console.log(`[Server] running at localhost:${PORT}`));