var mongoose = require('mongoose')

const poolSchema = new mongoose.Schema({
    moon: String,
    wishCount: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('pool', poolSchema)