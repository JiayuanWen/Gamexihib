const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    cover_image: {
        type: String,
        required: true
    },
    query_id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    year_release: {
        type: Number,
        required: true
    },
    month_release: {
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
        type: String,
        required: true
    },
    mtx: {
       type: Boolean,
        required: true
    },
    play_mode: {
        type: String,
        required: true
    }
});

const Game = mongoose.model("game", gameSchema);
module.exports = Game;
