var express      = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require('path');
var fs = require("fs");

var express = require('express');
var app = express();

app.use(express.static('public'));

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