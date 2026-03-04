const express = require('express')
const cookieParse = require('cookie-parser')
const cors = require('cors')
const { generateInterviewReport } = require('./services/ai.service')

const app = express()

app.use(express.json())
app.use(cookieParse())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// generateInterviewReport({ resume: 'test', selfDescription: 'test', jobDescription: 'test' })
// require all the routes here
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

// using all the routes here
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

module.exports = app