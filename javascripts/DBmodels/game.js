const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    cover_image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    year_release: {
        type: Number,
        required: true
    },
    genre: [{
        type: String, //To be changed
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    age_rating: {
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
