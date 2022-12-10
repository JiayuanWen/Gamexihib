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
        const {username,password,email,passwordV} = req.body;
        if (password.length < 5) {
            return res.status(400).render("signup",{Title: `Register | ${global.siteTitle}`, Message: `Error: Password should be 5 characters or longer.`});
        }
        if (!(password === passwordV)) {
            return res.status(400).render("signup",{Title: `Register | ${global.siteTitle}`, Message: `Error: Password does not patch.`});
        }

        bcrypt.hash(password,10).then(async (hash) => {
            await User.create({
                username,
                password: hash,
                email
            })
                .then(user =>
                res.status(200).render("signup",{Title: `Register | ${global.siteTitle}`, Message: `Account has been successfully created, you can now go back to login.`})
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
                if (password.length < 5) {
                    return res.status(400).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Error: Password should be 5 characters or longer.`});
                }
                if (user.mark_delete) {
                    return res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Error: User does not exist`});
                }
                bcrypt.compare(password,user.password).then(function (result) {
                    result ?
                    req.login(user, function(err) {
                        if (err) {return next(err)}

                        passport.serializeUser((user, done) => {
                            done(null, user.id);
                        });
                        passport.deserializeUser(function(id, done) {
                            User.findById(id, function(err, user) {
                                loggedInUser = user;
                                done(err, user);
                            });
                        });

                        console.log(`[auth.js] Login status: ${req.isAuthenticated()}`);
                        console.log(`[auth.js] Login username: ${req.user.username}`);
                        req.session.save(() => {
                            return res.redirect('/');
                        })
                    })
                    : res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: `Error: Username or Password is incorrect`});
                })

            }
        } catch (err) {
            res.status(401).render("signin",{Title: `Signin | ${global.siteTitle}`, Message: err.message});
        }
    };

    //User Logout
    exports.logout = async (req, res, next) => {
        if (req.isAuthenticated()) {
            //console.log(req.session);
            req.session.destroy(function (err) {

                return res.redirect(`/`);
            });
        } else {
                return res.redirect(`/`);
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
    exports.deleteUser = async (req, res, next) => {
        const {id} = req.user;
        await User.findById(id)
            .then((user) => {
                if (!user) {
                    console.log(`[auth.js] Error: User not found`)
                    req.session.save(() => {
                        return res.redirect('/');
                    })
                } else {
                    user.mark_delete = true;
                    user.save((err) => {
                        if (err) {
                            console.log(`[auth.js] Error: ${err}`)
                            if (req.isAuthenticated()) {
                                res.status(400).render("err",{
                                    isLogin: req.isAuthenticated(),
                                    Title: `Error | ${global.siteTitle}`,
                                    loginName: req.user.username,
                                    errorCode: res.statusCode,
                                    errorMessage: err
                                })
                            } else {
                                res.status(400).render("err",{
                                    isLogin: req.isAuthenticated(),
                                    Title: `Error | ${global.siteTitle}`,
                                    errorCode: res.statusCode,
                                    errorMessage: err
                                })
                            }
                            //process.exit(1);
                        }
                        console.log(`[auth.js] User marked for deletion`)
                        if (req.isAuthenticated()) {
                            //console.log(req.session);
                            req.session.destroy(function (err) {

                                return res.status(201).redirect(`/`);
                            });
                        } else {
                            return res.status(201).redirect(`/`);
                        }

                    })
                }
            })
    };

    //User Delete (Absolute)
    exports.deleteUserAbs = async (req,res,next) => {
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

