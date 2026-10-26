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
        const { name, duration, destination, price, description, image } = req.body

        if (!name || !duration || !destination || price === undefined || !description) {
            return res.status(400).json({ message: 'Please fill all required fields' })
        }

        const newPackage = new Package({
            name,
            duration,
            destination,
            price,
            description,
            image
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




app.put('/api/packages/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
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
                message: 'Invalid package information or ID'
            })
        }

        res.status(500).json({
            message: 'Failed to update package'
        })
    }
})


app.delete('/api/packages/:id', verifyAdmin, async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(
            req.params.id
        )

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
        const selectedDate = new Date(travelDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (isNaN(selectedDate.getTime()) || selectedDate < today) {
            return res.status(400).json({
                message: 'Please select a valid future travel date'
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