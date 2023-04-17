const mongoose = require('mongoose');

const connectDB = () => {
    
    mongoose.connect(process.env.MONGO_URI).then((res) => {
        console.log("connected");
    }).catch((e) => {
        // console.log("not connected");
        console.log(e)
    })
} 
module.exports = connectDB;