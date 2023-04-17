const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const userRoute = require('./Routes/userRoute')
const imageRoute = require('./Routes/imageRoute')
const leaderBoardRoute = require('./Routes/leaderBoardRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/app/user", userRoute)
app.use("/app/image", imageRoute)
app.use("/app/leaderBoard", leaderBoardRoute)
module.exports = app;