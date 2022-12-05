let {siteTitle,isLogin,loginUser} = require(`../../globalVar.js`);

// User
const User = require('../DBmodels/user.js');

    //User Register
    exports.register = async (req, res, next) => {
        const {username,password, email} = req.body;
        if (password.length < 5) {
            /*
            return res.status(400).json({message: "Password should be 5 characters or longer."});
            */
            return res.status(400).render("signup",{Title: `Register | ${siteTitle}`, Message: `Error: Password should be 5 characters or longer.`});
        }

        try {
            await User.create({
                username,
                password,
                email
            }).then(user =>
                /*
                res.status(200).json({
                    message: "User successfully created",
                    user
                })
                 */
                res.status(200).render("signin",{Title: `Register | ${siteTitle}`, Message: `Error: Account has been successfully created, try login in!`})
            )
        } catch (err) {
            /*
            res.status(401).json({
                message: "Failed to create user",
                error: err.message
            })
             */
            res.status(401).render("signin",{Title: `Signin | ${siteTitle}`, Message: err.message})
        }
    };

    //User Login
    exports.login = async (req, res, next) => {
        const {username, password} = req.body;
        /*
        if (!username || !password) {
            return res.status(400).json({
                message: "Username or Password field is blank"
            })
        }
        */
        try {
            const user = await User.findOne({username, password});
            if (!user) {
                /*
                res.status(401).json({
                    message: "Login unsuccessful",
                    error: "User does not exist"
                })
                 */
                res.status(401).render("signin",{Title: `Signin | ${siteTitle}`, Message: `Error: Username or Password is incorrect.`});
            } else {
                /*
                res.status(200).json({
                    message: "Login successful",
                    user
                })
                */
                isLogin = true;
                loginUser = user;
                res.status(200).redirect('/');
            }
        } catch (err) {
            res.status(400).json({
                message: "An error occured",
                error: err.message
            })
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
    exports.infoGet = async () => {
        const {title} = req.query.id;

        try {
            const game = await Game.findOne({title});
            if (!game) {
                /*
                res.status(401).json({
                    message: "Login unsuccessful",
                    error: "User does not exist"
                })
                 */
                res.status(401).render("signin",{Title: `Signin | ${siteTitle}`, Message: `Error: Username or Password is incorrect.`});
            } else {
                /*
                res.status(200).json({
                    message: "Login successful",
                    user
                })
                */
                isLogin = true;
                res.status(200).redirect('/');
            }
        } catch (err) {
            res.status(400).json({
                message: "An error occured",
                error: err.message
            })
        }

    };