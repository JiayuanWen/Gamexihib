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
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Gameplay Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Gameplay Score: Score must be within 0 to 100"
            }
        },
        required: true
    },
    // -------------------------------------------------------------------------
    score_graphics: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Graphics Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Graphics Score: Score must be within 0 to 100"
            }
        },
        required: true
    },
    // -------------------------------------------------------------------------
    score_sound: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Sound Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Sound Score: Score must be within 0 to 100"
            }
        },
        required: true
    },
    // -------------------------------------------------------------------------
    score_art: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Art Direction Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Art Direction Score: Score must be within 0 to 100"
            }
        },
        required: true
    },
    // -------------------------------------------------------------------------
    score_replayability: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Replayability Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Replayability Score: Score must be within 0 to 100"
            }
        },
        required: true
    },
    // -------------------------------------------------------------------------
    score_story: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Story Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Story Score: Score must be within 0 to 100"
            }
        },
        required: false
    },
    // -------------------------------------------------------------------------
    score_monetization: {
        min: {
            type: Number, min: 0,
            validate: {
                validator: function(val){
                    const currMax = this.target.income.range.max;
                    return (currMax !== undefined ? val <= currMax : true);
                },
                message: "Monetization Score: Score must be within 0 to 100"
            }
        },
        max: {
            type: Number, min: 100,
            validate: {
                validator: function(val) {
                    const currMin = this.target.income.range.min;
                    return (currMin !== undefined ? val >= currMin : true);
                },
                message: "Monetization Score: Score must be within 0 to 100"
            }
        },
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