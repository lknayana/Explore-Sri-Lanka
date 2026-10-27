const dns = require('dns')
dns.setServers(['8.8.8.8'])

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const Package = require('./models/Package')
const Booking = require('./models/Booking')

const cors = require('cors')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('./models/Admin')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))


app.use(express.json())


function verifyAdmin(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Please login as administrator'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.adminId) {
            return res.status(401).json({
                message: 'Invalid login token'
            })
        }

        req.adminId = decoded.adminId
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired login token'
        })
    }
}



app.get('/', (req, res) => {
    res.send('Explore Sri Lanka Backend is Running')
})


app.post('/api/packages', verifyAdmin, async (req, res) => {
    try {
        const {
            name,
            duration,
            destination,
            price,
            description,
            image,
            itinerary,
            includedServices,
            accommodation
        } = req.body

        if (!name || !duration || !destination || price === undefined || !description) {
            return res.status(400).json({ message: 'Please fill all required fields' })
        }

        const newPackage = new Package({
            name,
            duration,
            destination,
            price,
            description,
            image,
            itinerary,
            includedServices,
            accommodation: Number(duration) === 1 ? '' : accommodation
        })

        const savedPackage = await newPackage.save()

        res.status(201).json(savedPackage)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }

        res.status(500).json({ message: 'Failed to add package' })
    }
})



app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body

        if (typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username.trim() || !password) {
            return res.status(400).json({
                message: 'Please enter username and password'
            })
        }

        const admin = await Admin.findOne({
            username: username.trim()
        })

        if (!admin) {
            return res.status(401).json({
                message: 'Invalid username or password'
            })
        }

        const isValid = await bcrypt.compare(
            password,
            admin.password
        )

        if (!isValid) {
            return res.status(401).json({
                message: 'Invalid username or password'
            })
        }

        const token = jwt.sign(
            { adminId: admin._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.json({
            message: 'Login successful',
            token: token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Login failed'
        })
    }
})


app.get('/api/bookings', verifyAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('packageId', 'name duration destination')
            .sort({ createdAt: -1 })

        res.json(bookings)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to load bookings'
        })
    }
})



app.get('/api/packages', async (req, res) => {
    try {
        const packages = await Package.find()

        res.json(packages)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve packages'
        })
    }
})


app.get('/api/packages/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id)

        if (!pkg) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        res.json(pkg)
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid package ID'
            })
        }

        res.status(500).json({
            message: 'Failed to retrieve package'
        })
    }
})


app.put('/api/bookings/:id/status', verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body

        if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid booking status'
            })
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true, runValidators: true }
        )

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            })
        }

        res.json({
            message: 'Booking status updated successfully',
            booking: booking
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid booking ID'
            })
        }

        res.status(500).json({
            message: 'Failed to update booking status'
        })
    }
})




app.put('/api/packages/:id', verifyAdmin, async (req, res) => {
    try {
        const {
            name,
            duration,
            destination,
            price,
            description,
            image,
            itinerary,
            includedServices,
            accommodation
        } = req.body

        const packageData = {
            name,
            duration,
            destination,
            price,
            description,
            image,
            itinerary,
            includedServices,
            accommodation: Number(duration) === 1 ? '' : accommodation
        }

        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            packageData,
            { new: true, runValidators: true }
        )

        if (!updatedPackage) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        res.json(updatedPackage)

    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid package information'
            })
        }

        res.status(500).json({
            message: 'Failed to update package'
        })
    }
})




app.delete('/api/packages/:id', verifyAdmin, async (req, res) => {
    try {
        const packageId = req.params.id

        // Check whether the package has bookings
        const existingBooking = await Booking.findOne({
            packageId: packageId
        })

        if (existingBooking) {
            return res.status(400).json({
                message: 'Cannot delete a package with existing bookings'
            })
        }

        // Delete the package if no bookings exist
        const deletedPackage = await Package.findByIdAndDelete(packageId)

        if (!deletedPackage) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        res.json({
            message: 'Package deleted successfully'
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid package ID'
            })
        }

        res.status(500).json({
            message: 'Failed to delete package'
        })
    }
})



app.post('/api/bookings', async (req, res) => {
    try {
        const {
            packageId,
            customerName,
            email,
            phone,
            travelDate,
            travellers,
            vehicleType,
            guideLanguage,
            guideCount
        } = req.body

        // Check required fields
        if (!packageId || !customerName || !email || !phone ||
            !travelDate || travellers === undefined ||
            !vehicleType || !guideLanguage ||
            guideCount === undefined) {
            return res.status(400).json({
                message: 'Please fill all required fields'
            })
        }

        // Check whether the selected package exists
        const selectedPackage = await Package.findById(packageId)

        if (!selectedPackage) {
            return res.status(404).json({
                message: 'Selected tour package not found'
            })
        }

        // Check travel date


        const dateFormat = /^\d{4}-\d{2}-\d{2}$/

        const today = new Date()

        const sriLankaDate = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Colombo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(today)

        const year = sriLankaDate.find(p => p.type === 'year').value
        const month = sriLankaDate.find(p => p.type === 'month').value
        const day = sriLankaDate.find(p => p.type === 'day').value

        const todayString = `${year}-${month}-${day}`

        let validDate = false

        if (typeof travelDate === 'string' &&
            dateFormat.test(travelDate)) {

            const [y, m, d] = travelDate.split('-').map(Number)
            const date = new Date(Date.UTC(y, m - 1, d))

            validDate =
                date.getUTCFullYear() === y &&
                date.getUTCMonth() === m - 1 &&
                date.getUTCDate() === d
        }

        if (!validDate || travelDate < todayString) {
            return res.status(400).json({
                message: 'Please select a valid present or future travel date'
            })
        }




        if (!Number.isInteger(Number(travellers)) ||
            Number(travellers) < 1 ||
            Number(travellers) > 50) {
            return res.status(400).json({
                message: 'Number of travellers must be between 1 and 50'
            })
        }

        if (!Number.isInteger(Number(guideCount)) ||
            Number(guideCount) < 0 ||
            Number(guideCount) > 10) {
            return res.status(400).json({
                message: 'Number of guides must be between 0 and 10'
            })
        }

        if (!['Car', 'Van', 'Bus'].includes(vehicleType)) {
            return res.status(400).json({
                message: 'Please select a valid vehicle type'
            })
        }


        // Create the booking
        const newBooking = new Booking({
            packageId,
            customerName,
            email,
            phone,
            travelDate,
            travellers,
            vehicleType,
            guideLanguage,
            guideCount,
            status: 'Pending'
        })

        // Save booking in MongoDB
        const savedBooking = await newBooking.save()

        res.status(201).json({
            message: 'Booking request submitted successfully',
            booking: savedBooking
        })

    } catch (error) {
        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid booking information'
            })
        }

        res.status(500).json({
            message: 'Failed to submit booking request'
        })
    }
})




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully')

        app.listen(5000, () => {
            console.log('Server running on port 5000')
        })
    })
    .catch((error) => {
        console.log('Database connection failed:', error.message)
    })