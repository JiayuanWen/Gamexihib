const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    ageRating: {
        type: Number,
        required: true
    },
    mtx: {
       type: Boolean,
        required: true
    }
});

const Game = mongoose.model("game", gameSchema);
module.exports = Game;
