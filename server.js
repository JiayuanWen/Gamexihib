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
//Credit: Arjun K S, Medium (https://medium.com/swlh/building-a-simple-web-application-with-node-express-mongodb-dcd53231e83c)
const User = require('./DBmodels/user.js');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/user', (request, response) => {
const user = new User({
    userName : request.body.userName,
    email : request.body.email,
    password : request.body.password
});
bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
        return next(err);
    }
    user.password = hash;
    user.save().then(data => {
        console.log('New user successfully created');
    }).catch(error => {
        // you can send an error code here
    })
})
});
module.exports = router;

//Mongo DB --------------------------------------------


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