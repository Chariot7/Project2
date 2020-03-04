var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    posts: [Schema.Types.ObjectId],
    reflectionHistory: String,
    wishHistory: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)