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

    await newUser.save()

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

/**
 * @name loginUserController
 * @desc Login a user
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        })
    }

    const isPasswordValid = await bcryptJs.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid password'
        })
    }

    const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController
}