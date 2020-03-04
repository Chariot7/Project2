var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const wishSchema = new mongoose.Schema({
    selfWish: String,
    poolWish: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
    // poolId: 
    // wisherId: 
}, {
    timestamps: true
})

// const poolSchema = new mongoose.

module.exports = mongoose.model('wish', wishSchema)