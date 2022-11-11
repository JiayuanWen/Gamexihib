const User = require('../DBmodels/user.js');

//Register
exports.register = async (req, res, next) => {
    const {username,password, email} = req.body;
    if (password.length < 5) {
        return res.status(400).json({message: "Password should be 5 characters or longer."});
    }
    try {
        await User.create({
            username,
            password,
            email
        }).then(user =>
            res.status(200).json({
                message: "[auth.js] User successfully created",
                user
            })
        )
    } catch (err) {
        res.status(401).json({
            message: "[auth.js] Failed to create user",
            error: err.message
        })
    }
};

//Login
exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password field is blank"
        })
    }
    try {
        const user = await User.findOne({username, password})
        if (!user) {
            res.status(401).json({
                message: "Login unsuccessful",
                error: "User does not exist"
            })
        } else {
            res.status(200).json({
                message: "Login successful",
                user
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "An error occured",
            error: err.message
        })
    }
};

//Update
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