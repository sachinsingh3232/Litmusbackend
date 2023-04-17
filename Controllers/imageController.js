const Image = require("../Models/imageModel");
const User = require("../Models/userModel")
const createLevel = async (req, res) => {
    try {
        const level = await Image.create(req.body);
        console.log(level);
        res.json({ message: "Registered as " + level.level });
    } catch (e) {
        console.log(e)
    }
}
const fetchLevelImages = async (req, res) => {
    try {
        const data = await Image.findOne({ level: req.body.level });
        if (!data) {
            res.json({ message: "invalid level" });
        }
        else {
            const user = await User.findByIdAndUpdate(req.decodedToken.id, {
                isPlaying: true,
            });
            res.json({ level: data.level, images: data.images, hint: data.hint });
        }
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = { fetchLevelImages, createLevel }