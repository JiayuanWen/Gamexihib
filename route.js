const express = require("express");
const router = express.Router();
const {register} = require('./auth.js');

router.route('/register').post(register);

module.exports = router;