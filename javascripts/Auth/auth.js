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