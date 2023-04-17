const express = require('express');
const router = express.Router();
const { fetchLevelImages ,createLevel} = require("../Controllers/imageController")
const { isUserAuthenticated } = require("../MiddleWare/auth.js");
router.route("/fetchLevelImages").post(isUserAuthenticated, fetchLevelImages);
router.route("/createLevel").post(isUserAuthenticated, createLevel);

module.exports = router;