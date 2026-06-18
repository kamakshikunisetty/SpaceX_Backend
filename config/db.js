const mongoose = require('mongoose')

const initializeDatabase = async () => {
    const mongoConnectionUri = process.env.MONGO_URI

    if (!mongoConnectionUri || typeof mongoConnectionUri !== 'string' || mongoConnectionUri.trim() === '') {
        const errorMessage = 'MongoDB connection failed: MONGO_URI environment variable is not defined.'
        console.error(errorMessage)
        throw new Error(errorMessage)
    }

    try {
        await mongoose.connect(mongoConnectionUri)
        console.log('db connected')
    } catch (databaseConnectionError) {
        console.error('MongoDB connection failed:', databaseConnectionError.message)
        throw databaseConnectionError
    }
}

module.exports = initializeDatabase
