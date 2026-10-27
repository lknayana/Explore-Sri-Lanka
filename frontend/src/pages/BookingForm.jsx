
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './BookingForm.css'

function BookingForm() {
    const { id } = useParams()

    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [travelDate, setTravelDate] = useState('')
    const [travellers, setTravellers] = useState(1)
    const [vehicleType, setVehicleType] = useState('Car')
    const [guideLanguage, setGuideLanguage] = useState('English')
    const [guideCount, setGuideCount] = useState(0)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function submitBooking(e) {
        e.preventDefault()
        setMessage('')
        setError('')

        const booking = {
            packageId: id,
            customerName,
            email,
            phone,
            travelDate,
            travellers: Number(travellers),
            vehicleType,
            guideLanguage,
            guideCount: Number(guideCount)
        }

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Booking failed')
            }

            setMessage('Booking request submitted successfully! Status: Pending.')
            setSubmitted(true)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="booking-page">
            <Link to={`/packages/${id}`}>Back to Package</Link>

            <h1>Request Your Tour</h1>
            <p>Please fill in your details to request a booking.</p>

            {message && <p className="booking-success">{message}</p>}
            {error && <p className="booking-error">{error}</p>}

            {!submitted && (
                <form onSubmit={submitBooking} className="booking-form">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                    <label>Travel Date</label>
                    <input
                        type="date"
                        value={travelDate}
                        min={new Date().toLocaleDateString('en-CA')}
                        onChange={e => setTravelDate(e.target.value)}
                        required
                    />

                    <label>Number of Travellers</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        step="1"
                        value={travellers}
                        onChange={e => setTravellers(e.target.value)}
                        required

                    />

                    <label>Preferred Vehicle</label>
                    <select
                        value={vehicleType}
                        onChange={e => setVehicleType(e.target.value)}
                    >
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                    </select>

                    <label>Preferred Guide Language</label>
                    <select
                        value={guideLanguage}
                        onChange={e => setGuideLanguage(e.target.value)}
                    >
                        <option value="English">English</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="Tamil">Tamil</option>
                    </select>

                    <label>Number of Guides Requested</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={guideCount}
                        onChange={e => setGuideCount(e.target.value)}
                        required

                    />

                    <button type="submit">Submit Booking Request</button>
                </form>
            )}

            <p className="booking-note">
                Your booking will be confirmed after review by our team.
            </p>
        </div>
    )
}

export default BookingForm
