const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Visitor", //Roles: Moderator, Admin, Visitor, Developer
        required: true
    },
    mark_delete: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;