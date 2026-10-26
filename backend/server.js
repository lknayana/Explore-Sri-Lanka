const dns = require('dns')
dns.setServers(['8.8.8.8'])

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Explore Sri Lanka Backend is Running')
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