
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },

    reviewerName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: Number.isInteger
    },

    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 500
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)
