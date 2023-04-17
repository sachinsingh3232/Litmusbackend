const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    level:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    hint:{
        type:String,
        required:true
    },
    answer:{
        type:Array
    }
})
const Images = new mongoose.model('images', imageSchema);
module.exports = Images;       