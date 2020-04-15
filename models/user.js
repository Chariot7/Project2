var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    wishes: [{type: Schema.Types.ObjectId, ref: 'Wish'}],
    // reflectionHistory: String,
    // wishHistory: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)