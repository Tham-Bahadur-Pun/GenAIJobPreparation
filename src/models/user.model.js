const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, 'Username already taken'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'Email already registered'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel