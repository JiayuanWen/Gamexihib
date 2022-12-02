const express = require("express");
const router = express.Router();

//User
const {register,login,update,deleteUser} = require('./auth.js');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateAcc').put(update);
router.route('/deleteAcc').delete(deleteUser);

//Game
const {} = require('../Get/gameInfoGet');

module.exports = router;