const jwt = require('jsonwebtoken')
const bcryptJs = require('bcryptjs')
const userModel = require('../models/user.model')

/**
 * @name registerUserController
 * @desc Register a new user
 * @access Public
 */
async function registerUserController(req, res) {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ userName }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: 'Username or email already taken'
        })
    }

    const hashedPassword = await bcryptJs.hash(password, 10);

    const newUser = new userModel({
        userName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: newUser._id, userName: newUser.userName }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
        }
    })

}


module.exports = {
    registerUserController
}