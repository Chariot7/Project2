var mongoose = require('mongoose')

const wishSchema = new mongoose.Schema({
    selfWish: String,
    poolWish: String,
    // poolId: 
    // wisherId: 
}, {
    timestamps: true
})

const poolSchema = new mongoose.

module.exports = mongoose.model('wish', wishSchema)