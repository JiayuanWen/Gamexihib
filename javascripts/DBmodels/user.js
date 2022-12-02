const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "Visitor", //Roles: Moderator, Admin, Visitor, Developer
        required: true
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;