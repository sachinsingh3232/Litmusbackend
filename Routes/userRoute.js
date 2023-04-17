const express = require('express');
const router = express.Router();
const { Register, Login, findAllUser, Delete,  Update, deadEnd, lastData, userScore, ResetPassword, LogOut } = require("../Controllers/userController.js");
const { isUserAuthenticated, isAdmin } = require("../MiddleWare/auth.js");
router.route("/Register").post(Register);
router.route("/Login").post(Login);
router.route("/LogOut").get(LogOut);
router.route("/findAllUser").get(isUserAuthenticated, isAdmin, findAllUser);
router.route("/Delete/:__id").delete(isUserAuthenticated, Delete);
router.route("/deadEnd").post(isUserAuthenticated, deadEnd);
router.route("/lastData").post(isUserAuthenticated, lastData);
router.route("/userScore").post(isUserAuthenticated, isAdmin, userScore);
router.route("/Update").post(isUserAuthenticated, Update);
router.route("/ResetPassword/:__id").post(isUserAuthenticated, ResetPassword);

module.exports = router;