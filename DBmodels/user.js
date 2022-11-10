//Credit: Arjun K S, Medium (https://medium.com/swlh/building-a-simple-web-application-with-node-express-mongodb-dcd53231e83c)
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: { type: String, unique: true,required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User',userSchema);