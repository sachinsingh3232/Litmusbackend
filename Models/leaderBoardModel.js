const mongoose = require("mongoose");
const leaderBoardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    level1:{
        type:Number,
        require:true
    },
    level2:{
        type:Number,
        require:true
    },
    level3:{
        type:Number,
        require:true
    },
    level4:{
        type:Number,
        require:true
    },
    totalScore:{
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
