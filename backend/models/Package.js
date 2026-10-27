
const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    duration: {
        type: Number,
        required: true,
        enum: [1, 3, 5]
    },

    destination: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    description: {
        type: String,
        required: true
    },

    itinerary: {
        type: String,
        default: ''
    },

    includedServices: {
        type: String,
        default: ''
    },

    accommodation: {
        type: String,
        default: ''
    },

    image: {
        type: String
    }
})

module.exports = mongoose.model('Package', packageSchema)
