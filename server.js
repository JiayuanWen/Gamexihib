var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require('path');
var fs = require("fs");
const mongoose = require('mongoose');

var app = express();

app.use(express.static('public'));

//Mongo DB ---------------------------------------

//Mongo DB ---------------------------------------

//Connection test
mongoose.connect('mongodb+srv://gamexhibi:ihatemtx@sweng465-gamexhibi.ijodktv.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {throw err;}
    else {console.log('Successfully connected to Mongo DB');}
});

//Web endpoints ---------------------------------------

//Home page '/'
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/home.html');

    console.log(__dirname+'/home.html');
    console.log("Cookies: ", req.cookies);
    console.log("")
});

//Server listening
var serverJiayuanWen = app.listen(8081, function () {
    var host = serverJiayuanWen.address().address;
    var port = serverJiayuanWen.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});