const Game = require('../DBmodels/game.js');
const User = require("../DBmodels/user");

exports.getName = async (req, res, next) => {
    const {id} = req.query;

    try {
        const game = await Game.findOne({id});
        if (!game) {
            res.status(401).json({
                message: "Search failed",
                error: "Game with indicated ID does not exist"
            })
        } else {
            res.status(200).json({
                message: "Search successful",
                user
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "An error occured",
            error: err.message
        })
    }
}