let {global} = require(`../../globalVar.js`);

const bcrypt = require(`bcryptjs`);

var session = require(`express-session`);
var fileStore = require(`session-file-store`)(session);
var passport = require(`passport`);
const { v4: uuid } = require('uuid'); uuid(); //const uuid = require(`uuid/v4`);
var LocalStrategy = require('passport-local').Strategy;

//Game info get
const Game = require('../DBmodels/game.js');
const Review = require('../DBmodels/review.js');
    exports.infoGet = async (req,res,next) => {
    req.session.recentUrl = req.url;

    ///*
    const query_id = req.query.id;

    try {
        const game = await Game.findOne({"query_id":query_id});
        if (!game) {
            var errorMessage = "Cannot find game in database."
            if (req.isAuthenticated()) {
                res.status(401).render("err",
                    {
                        isLogin: req.isAuthenticated(),
                        Title: `Error | ${global.siteTitle}`,
                        loginName: req.user.username,
                        errorCode: res.statusCode,
                        errorMessage: errorMessage
                    })

            } else {
                res.status(401).render("err",
                    {
                        isLogin: req.isAuthenticated(),
                        Title: `Error | ${global.siteTitle}`,
                        errorCode: res.statusCode,
                        errorMessage: errorMessage
                    })
            }

        } else {
            //Convert month int to word.
            var months = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
            var gameplayScore = 0;
            var graphicScore = 0;
            var soundScore = 0;
            var artScore = 0;
            var replayScore = 0;
            var storyScore = 0;

            gameplayScore = Review.aggregate([
                {$avg_val: {$avg: "$score_gameplay"}}
            ])

            if (req.isAuthenticated()) {
                res.status(200).render("game",
                    {
                        isLogin: req.isAuthenticated(),
                        Title: `Game | ${global.siteTitle}`,
                        loginName: req.user.username,

                        gameCoverSrc: game.cover_image,
                        gameTitle: game.title,
                        gameDev: game.developer,
                        gameReleaseMonth: months[game.month_release-1],
                        gameReleaseYear: game.year_release,
                        gameGenre: game.genre,
                        gameModes: game.play_mode,
                        gameAgeRating: game.age_rating,
                        gameDesc: game.description,

                        gameplayScore: gameplayScore,
                        graphicScore: graphicScore,
                        soundScore: soundScore,
                        artScore: artScore,
                        replayScore: replayScore,
                        storyScore: storyScore

                    });

            } else {
                res.status(200).render("game",
                    {
                        isLogin: req.isAuthenticated(),
                        Title: `Game | ${global.siteTitle}`,

                        gameCoverSrc: game.cover_image,
                        gameTitle: game.title,
                        gameDev: game.developer,
                        gameReleaseMonth: months[game.month_release-1],
                        gameReleaseYear: game.year_release,
                        gameGenre: game.genre,
                        gameModes: game.play_mode,
                        gameAgeRating: game.age_rating,
                        gameDesc: game.description,

                        gameplayScore: gameplayScore,
                        graphicScore: graphicScore,
                        soundScore: soundScore,
                        artScore: artScore,
                        replayScore: replayScore,
                        storyScore: storyScore
                    });
            }

        }
    } catch (err) {
        if (req.isAuthenticated()) {
            res.status(401).render("err",
                {
                    isLogin: req.isAuthenticated(),
                    Title: `Error | ${global.siteTitle}`,
                    loginName: req.user.username,
                    errorCode: res.statusCode,
                    errorMessage: errorMessage
                })

        } else {
            res.status(401).render("err",
                {
                    isLogin: req.isAuthenticated(),
                    Title: `Error | ${global.siteTitle}`,
                    errorCode: res.statusCode,
                    errorMessage: errorMessage
                })
        }
    }

    // */

};

//Review post
    exports.reviewPost = async (req,res,next) => {
        const {gameplayrating, graphicrating, soundrating, artrating, replayrating, storyrating} = req.body;

        try {
            await Review.create({
                reviewername: req.user.username,
                score_gameplay: gameplayrating,
                score_graphics: graphicrating,
                score_sound: soundrating,
                score_art: artrating,
                score_replayability: replayrating,
                score_story: storyrating
            }).then(
                res.status(200).redirect('back')
            )
        } catch (err) {
            res.status(401).redirect('back')
        }
    };