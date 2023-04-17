const express = require('express');
const router = express.Router();
const { findRanking } = require("../Controllers/leaderBoardController")
const { isUserAuthenticated } = require("../MiddleWare/auth");
router.route("/findRanking").get(isUserAuthenticated, findRanking);

module.exports = router;