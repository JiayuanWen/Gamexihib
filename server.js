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
const User = require('./DBmodels/user.js');
const router = express.Router();
const {register} = require("./auth.js");

router.route('/register').post(register);

module.exports = router;

//Mongo DB --------------------------------------------


//Connection test
mongoose.connect('mongodb+srv://gamexhibi:ihatemtx@sweng465-gamexhibi.ijodktv.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log('[MongoDB] Connection error:');
        throw err;
    }
    else {
        console.log('[MongoDB] Successfully connected to Mongo DB');
    }
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