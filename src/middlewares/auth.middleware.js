const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
        })
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: 'Unauthorized: Token is invalid'
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
            error: err
        })
    }
}

module.exports = {
    authUser
}