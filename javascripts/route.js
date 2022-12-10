const express = require("express");
const router = express.Router();

//User
const {register,login,logout,update,deleteUserAbs,deleteUser} = require('./Auth/auth.js');
    router.route('/register').post(register);
    router.route('/login').post(login);
    router.route('/logout').post(logout);
    router.route('/updateAcc').put(update);
    router.route('/deleteAcc').delete(deleteUserAbs);
    router.route('/delete').post(deleteUser);

//Game
const {infoGet,reviewPost} = require('./Get/gameGet.js');
    router.route('/game').get(infoGet);
    router.route('/postreview').post(reviewPost);

module.exports = router;