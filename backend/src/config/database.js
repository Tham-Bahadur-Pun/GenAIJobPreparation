const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database')
    }
    catch (error) {
        console.log('Error on connecting to database', error)
    }
}

module.exports = connectToDB