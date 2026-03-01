const jwt = require('jsonwebtoken')

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
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