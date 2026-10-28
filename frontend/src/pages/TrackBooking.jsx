
import { useState } from 'react'
import './TrackBooking.css'

function TrackBooking() {
    const [bookingId, setBookingId] = useState('')
    const [email, setEmail] = useState('')
    const [booking, setBooking] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function trackBooking(e) {
        e.preventDefault()
        setError('')
        setBooking(null)
        setLoading(true)

        try {
            const response = await fetch(
                'http://localhost:5000/api/bookings/track',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId, email })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Booking not found')
            }

            setBooking(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="tracking-page">
            <div className="tracking-card">
                <h1>Track Your Booking</h1>
                <p>Enter your booking reference and email address.</p>

                <form onSubmit={trackBooking}>
                    <label>Booking Reference</label>
                    <input
                        type="text"
                        value={bookingId}
                        onChange={e => setBookingId(e.target.value)}
                        placeholder="Enter booking reference"
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your booking email"
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Checking...' : 'Track Booking'}
                    </button>
                </form>

                {error && <p className="tracking-error">{error}</p>}

                {booking && (
                    <div className="tracking-result">
                        <h2>{booking.packageName}</h2>

                        <p>
                            <strong>Travel Date:</strong>{' '}
                            {String(booking.travelDate).slice(0, 10)}
                        </p>

                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={`tracking-status status-${booking.status.toLowerCase()}`}>
                                {booking.status}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default TrackBooking
