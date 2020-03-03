var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    reflectionHistory: String,
    wishHistory: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)