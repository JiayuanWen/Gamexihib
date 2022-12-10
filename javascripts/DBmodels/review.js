const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    //For displaying user names
    reviewername: {
        type: String,
        required: true
    },

    //Individual scores
    // Credit: Flame_Phoenix (Stack Overflow)
    // https://stackoverflow.com/questions/43066794/how-to-represent-range-in-mongoose-schema
    score_gameplay: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_graphics: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_sound: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_art: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_replayability: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_story: {
        type: Number,
        required: true
    },
    // -------------------------------------------------------------------------
    score_monetization: {
        type: Number,
        required: false
    },

    //Additional review
    additionalreview: {
        type: String,
        required: false
    }
    });

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;