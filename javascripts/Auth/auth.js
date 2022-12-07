let {global} = require(`../../globalVar.js`);

const bcrypt = require(`bcryptjs`);

var session = require(`express-session`);
var fileStore = require(`session-file-store`)(session);
var passport = require(`passport`);
const { v4: uuid } = require('uuid'); uuid(); //const uuid = require(`uuid/v4`);
var LocalStrategy = require('passport-local').Strategy;

// User
const User = require('../DBmodels/user.js');

    //User Register
    exports.register = async (req, res, next) => {
        const {username,password, email} = req.body;
        if (password.length < 5) {
            return res.status(400).render("signup",{Title: `Register | ${global.siteTitle}`, Message: `Error: Password should be 5 characters or longer.`});
        }

        bcrypt.hash(password,10).then(async (hash) => {
            await User.create({
                username,
                password: hash,
                email
            })
                .then(user =>
                res.status(200).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Account has been successfully created, you can now login in.`})
                )
                .catch((err) =>
                    res.status(401).render("signup",{Title: `Register | ${global.siteTitle}`, Message: err.message})
                )
        })
    };

    //User Login
    exports.login = async (req, res, next) => {

        const {username, password} = req.body;
        try {
            const user = await User.findOne({username});
            if (!user) {
                res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Error: User does not exist`});
            } else {
                bcrypt.compare(password,user.password).then(function (result) {
                    result ?
                        global.isLogin = true
                        : global.isLogin = false
                })
                bcrypt.compare(password,user.password).then(function (result) {
                    result ?
                        global.loginUser = user
                        : global.loginUser = null;
                })
                bcrypt.compare(password,user.password).then(function (result) {
                    result ?
                        global.loginUserName = global.loginUser.username
                        : global.loginUserName = ""
                })
                bcrypt.compare(password,user.password).then(function (result) {
                    result ?
                    res.status(200).redirect('/')
                    : res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Error: Username or Password is incorrect`});
                })

            }
        } catch (err) {
            res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: err.message});
        }
    };

    //User Logout
    exports.logout = async (req, res, next) => {
        if (global.isLogin) {
            //console.log(req.session);
            req.session.destroy(function (err) {
                global.isLogin = false;
                global.loginUser = null;
                global.loginUserName = "";
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    };

    //User Update
    exports.update = async (req, res, next) => {
        const {role, id} = req.body;
        if (role && id) {
            if (role === "Admin") {
                await User.findById(id)
                    .then((user) => {
                        if (user.role !== "Admin") {
                            user.role = role;
                            user.save((err) => {
                                if (err) {
                                    res.status(400).json({
                                        message: "An error occurred",
                                        error: err.message
                                    });
                                    process.exit(1);
                                }
                                res.status(201).json({
                                    message: "User successfully updated",
                                    user
                                })
                            })
                        } else {
                            res.status(400).json ({
                                message: "User is already an Admin"
                            })
                        }
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: "An error occurred",
                            error: err.message
                        })
                    })
            } else {
                res.status(400).json({
                    message: "User is not an admin"
                })
            }
        } else {
            res.status(400).json({
                message: "Desired user is missing ID or Role"
            })
        }
    };

    //User Delete
    exports.deleteUser = async (req,res,next) => {
        const {id} = req.body;
        await User.findById(id)
            .then(user => user.remove())
            .then(user =>
                res.status(201).json({
                    message: "User successfully deleted",
                    user
                })
            )
            .catch(err =>
                res.status(400).json({
                    message: "An error occurred",
                    error: err.message
                })
            )
    };

//Game page
const Game = require('../DBmodels/game.js');

    //Game info get
    exports.infoGet = async (req,res,next) => {
        ///*
        const query_id = req.query.id;


        try {
            const game = await Game.findOne({"query_id":query_id});
            if (!game) {
                var errorMessage = "Cannot find game in database."
                res.status(401).render("err",
                    {
                        isLogin: global.isLogin,
                        Title: `Error | ${global.siteTitle}`,
                        loginName: global.loginUserName,
                        errorCode: res.statusCode,
                        errorMessage: errorMessage
                    })
            } else {
                //Convert month int to word.
                var months = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                var monthRelease = months[game.month_release-1];

                res.status(200).render("game",
                    {
                        isLogin:
                        global.isLogin,
                        Title: `Game | ${global.siteTitle}`,
                        loginName: global.loginUserName,
                        gameCoverSrc: game.cover_image,
                        gameTitle: game.title,
                        gameDev: game.developer,
                        gameReleaseMonth: months[game.month_release-1],
                        gameReleaseYear: game.year_release,
                        gameGenre: game.genre,
                        gameModes: game.play_mode,
                        gameAgeRating: game.age_rating,
                        gameDesc: game.description
                    });
            }
        } catch (err) {
            res.status(400).render("err",
                {
                    isLogin: global.isLogin,
                    Title: `Error | ${global.siteTitle}`,
                    loginName: global.loginUserName,
                    errorCode: res.statusCode,
                    errorMessage: err.message
                })
        }

        // */

    };