
const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
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

    image: {
        type: String
    }
})

module.exports = mongoose.model('Package', packageSchema)
