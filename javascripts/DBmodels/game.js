const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({

});

const Game = mongoose.model("game", gameSchema);
module.exports = Game;
