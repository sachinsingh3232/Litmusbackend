const leaderBoard = require("../Models/leaderBoardModel");

const findRanking= async (req, res) => {
    try {
        const ranking = await leaderBoard.find().sort( { score : -1, time: 1 } ).limit(10);
        if (ranking.length < 1) {
            return res.json({ message: "There is no user" });
        }
        res.json({ranking});
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = { findRanking }