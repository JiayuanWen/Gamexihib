const express = require("express");
const router = express.Router();

//User
const {register,login,logout,update,deleteUser} = require('./auth.js');
    router.route('/register').post(register);
    router.route('/login').post(login);
    router.route('/logout').post(logout);
    router.route('/updateAcc').put(update);
    router.route('/deleteAcc').delete(deleteUser);

//Game
const {} = require('./auth.js');

module.exports = router;