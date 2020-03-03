var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)