const User = require("../Models/userModel");
const leaderBoard = require("../Models/leaderBoardModel");
const IMAGE = require("../Models/imageModel");
const JWT = require("jsonwebtoken");
const Register = async (req, res) => {
    try {
        const Email = req.body.email.toLowerCase();
        const existingUser = await User.findOne({ email: Email });
        if (existingUser) {
            res.json("User Already Exist");
            return;
        }
        const user = await User.create({
            name: req.body.name,
            email: Email,
            password: req.body.password,
        });
        console.log(user);
        res.json({ message: "Registered as " + user.name });
    } catch (e) {
        console.log(e);
    }
};
const Login = async (req, res) => {
    try {
        const Email = req.body.email.toLowerCase();
        const existingUser = await User.findOne({ email: Email }).select(
            "+password"
        );
        if (!existingUser) {
            res.json("User Doesn't Exist");
            return;
        }
        const isPasswordMatched = await existingUser.comparePassword(
            req.body.password
        );
        if (!isPasswordMatched) {
            res.json("incorrect Password");
            return;
        } else {
            // generating JWT token
            const token = existingUser.get_JWT_Token();
            const options = {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            };
            // console.log(token);
            res
                .cookie("token", token, options)
                .json({ message: "Logged In Successfully ", data: existingUser });
        }
    } catch (e) { }
};
const LogOut = async (req, res) => {
    try {
        res.clearCookie("token").json({ message: "Logged Out" });
    } catch (e) { }
};
const findAllUser = async (req, res) => {
    try {
        const user = await User.find();
        if (user.length < 1) {
            return res.json({ message: "There is no user" });
        }
        res.json(user);
    } catch (e) { }
};
const Delete = async (req, res) => {
    try {
        await User.deleteOne({ id: req.params._id });
        res.send("Deleted");
    } catch (e) {
        res.send(e);
    }
};
const Update = async (req, res) => {
    try {
        console.log(req.decodedToken.id);
        const user = await User.findByIdAndUpdate(req.decodedToken.id, {
            age: req.body.age,
            name: req.body.name,
            email: req.body.email,
            sex: req.body.sex,
        });
        console.log(user);
        res.json({ message: user.name + "'s details are updated" });
    } catch (e) {
        res.send(e);
    }
};
const deadEnd = async (req, res) => {
    try {
        const totalTime = req.body.level1 + req.body.level2 + req.body.level3 + req.body.level4;
        const loggedUser = await User.findOne({ _id: req.decodedToken.id });
        let newScore = [...loggedUser.score];
        newScore.push({
            level1: req.body.level1,
            level2: req.body.level2,
            level3: req.body.level3,
            level4: req.body.level4,
            core: (req.body.level - 1) * 5 > 0 ? (req.body.level - 1) * 5 : 0,
            time: totalTime,
        });
        const user = await User.findByIdAndUpdate(req.decodedToken.id, {
            score: newScore,
            isPlaying: false,
        });
        const leader = await leaderBoard.create({
            name: loggedUser.name,
            level1: req.body.level1,
            level2: req.body.level2,
            level3: req.body.level3,
            level4: req.body.level4,
            totalScore: (req.body.level - 1) * 5 > 0 ? (req.body.level - 1) * 5 : 0,
            time: totalTime,
        });
        res.json({ message: user.name + "'s socre is updated" });
    } catch (e) {
        res.send(e);
    }
};
const lastData = async (req, res) => {
    try {
        // console.log(req.body.level);
        const ans = req.body.ans.toLowerCase();
        console.log(ans + " line 123");
        const answ = await IMAGE.findOne({ level: req.body.level });
        const answers = answ.answer;
        const newData = {
            level: req.body.level,
            level1: req.body.level1,
            level2: req.body.level2,
            level3: req.body.level3,
            level4: req.body.level4,
            totalScore: req.body.level * 5,
            time:
                req.body.level1 + req.body.level2 + req.body.level3 + req.body.level4,
        };
        console.log(answers);
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === ans && req.body.level < 4) {
                console.log(ans);
                const newLevel = await IMAGE.findOne({ level: req.body.level + 1 });
                const user = await User.findByIdAndUpdate(req.decodedToken.id, {
                    lastData: newData,
                });
                res.json({
                    level: newLevel.level,
                    images: newLevel.images,
                    hint: newLevel.hint,
                });
                break;
            } else if (answers[i] === ans && req.body.level === 4) {
                const loggedUser = await User.findOne({ _id: req.decodedToken.id });
                let newScore = [...loggedUser.score];
                newScore.push({
                    level1: newData.level1,
                    level2: newData.level2,
                    level3: newData.level3,
                    level4: newData.level4,
                    totalScore: newData.totalScore,
                    time: newData.time,
                });
                const user = await User.findByIdAndUpdate(req.decodedToken.id, {
                    score: newScore,
                    isPlaying: false,
                });
                const leader = await leaderBoard.create({
                    name: loggedUser.name,
                    level1: req.body.level1,
                    level2: req.body.level2,
                    level3: req.body.level3,
                    level4: req.body.level4,
                    totalScore: (req.body.level - 1) * 5 > 0 ? (req.body.level - 1) * 5 : 0,
                    time: newData.time,
                });
                res.json({ message: true });
                break;
            } else if (i == answers.length - 1) res.json({ message: false });
        }
    } catch (e) {
        res.send(e);
    }
};
const userScore = async (req, res) => {
    try {
        const Email = req.body.email.toLowerCase();
        const user = await User.findOne({ email: Email });
        // console.log(user)
        res.json({ data: user.score });
    } catch (e) {
        res.send(e);
    }
};
const ResetPassword = async (req, res) => {
    try {
        let user = await User.findById(req.params.__id).select("+password");
        if (user.password != req.body.oldPassword) {
            return res.json({ message: "Please Enter valid Old Password" });
        }
        if (req.body.oldPassword === req.body.newPassword) {
            return res.json({ message: "Please Enter a new Passowrd" });
        }
        await User.findByIdAndUpdate(req.params.__id, {
            password: req.body.newPassword,
        });
        res.send({ message: "Password Updated" });
    } catch (e) {
        res.send(e);
    }
};
module.exports = {
    Register,
    Login,
    findAllUser,
    Delete,
    Update,
    deadEnd,
    lastData,
    userScore,
    ResetPassword,
    LogOut,
};
