const dns = require('dns')
dns.setServers(['8.8.8.8'])

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const Package = require('./models/Package')

const cors = require('cors')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Explore Sri Lanka Backend is Running')
})


app.post('/api/packages', async (req, res) => {
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




app.put('/api/packages/:id', async (req, res) => {
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


app.delete('/api/packages/:id', async (req, res) => {
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