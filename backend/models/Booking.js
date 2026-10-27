
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },

    customerName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    travelDate: {
        type: Date,
        required: true
    },

    travellers: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },

    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'Van', 'Bus']
    },

    guideLanguage: {
        type: String,
        required: true
    },

    guideCount: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)
