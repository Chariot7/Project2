var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const wishSchema = new mongoose.Schema({
    selfWish: String,
    poolWish: String,
    likes: [likeSchema]
}, {
    timestamps: true
})

// const poolSchema = new mongoose.

module.exports = mongoose.model('Wish', wishSchema)