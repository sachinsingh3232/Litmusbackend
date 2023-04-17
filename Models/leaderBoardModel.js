const mongoose = require("mongoose");
const leaderBoardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})
const leaderBoard = new mongoose.model('leaderBoard', leaderBoardSchema);
module.exports = leaderBoard;
// db.users.find({ }).sort( { age : -1, posts: 1 } )
// db.collection.find(<query>).limit(<number>)
