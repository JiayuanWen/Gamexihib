var express      = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require("fs");

var express = require('express');
var app = express();

app.use(express.static('public'));

//Home page '/'
app.get('/', function (req, res) {
    res.send('Hello World');

    console.log("Cookies: ", req.cookies);
});

//Server listening
var serverJiayuanWen = app.listen(8081, function () {
    var host = serverJiayuanWen.address().address;
    var port = serverJiayuanWen.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});