
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ManageBookings.css'

function ManageBookings() {
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const token = sessionStorage.getItem('adminToken')

    useEffect(() => {
        if (!token) {
            navigate('/admin/login', { replace: true })
            return
        }

        fetch('http://localhost:5000/api/bookings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    sessionStorage.removeItem('adminToken')
                    navigate('/admin/login', { replace: true })
                    throw new Error('Please log in again')
                }

                if (!response.ok) {
                    throw new Error('Could not load bookings')
                }

                return response.json()
            })
            .then(data => setBookings(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [token, navigate])

    async function updateStatus(id, status) {
        setError('')
        setMessage('')

        try {
            const response = await fetch(
                `http://localhost:5000/api/bookings/${id}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            )

            if (response.status === 401) {
                sessionStorage.removeItem('adminToken')
                navigate('/admin/login', { replace: true })
                return
            }

            if (!response.ok) {
                throw new Error('Could not update booking')
            }

            setBookings(bookings.map(booking =>
                booking._id === id
                    ? { ...booking, status: status }
                    : booking
            ))

            setMessage('Booking status updated successfully')
        } catch (err) {
            setError(err.message)
        }
    }

    if (!token) return null

    return (
        <div className="manage-bookings">
            <Link to="/admin">Back to Dashboard</Link>

            <h1>Manage Bookings</h1>
            <p>Review and manage tourist booking requests.</p>

            {error && <p className="booking-error">{error}</p>}
            {message && <p className="booking-success">{message}</p>}

            {loading && <p>Loading bookings...</p>}

            {!loading && bookings.length === 0 && !error && (
                <p>No booking requests available.</p>
            )}

            {!loading && bookings.map(booking => (
                <div className="admin-booking-card" key={booking._id}>
                    <h2>{booking.customerName}</h2>

                    <p>
                        <strong>Package:</strong>{' '}
                        {booking.packageId?.name || 'Package unavailable'}
                    </p>


                    <div className="booking-info">
                        <p><strong>Email:</strong> {booking.email}</p>
                        <p><strong>Phone:</strong> {booking.phone}</p>
                    </div>


                    <p>
                        <strong>Travel Date:</strong>{' '}
                        {new Date(booking.travelDate).toLocaleDateString()}
                    </p>

                    <p><strong>Travellers:</strong> {booking.travellers}</p>
                    <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                    <p><strong>Guide Language:</strong> {booking.guideLanguage}</p>
                    <p><strong>Guides Requested:</strong> {booking.guideCount}</p>

                    <p>
                        <strong>Status: </strong>
                        <span
                            className={`booking-status status-${booking.status.toLowerCase()}`}
                        >
                            {booking.status}
                        </span>
                    </p>


                    <div className="booking-actions">
                        <button
                            onClick={() => updateStatus(booking._id, 'Confirmed')}
                            disabled={booking.status === 'Confirmed'}
                        >
                            Confirm
                        </button>

                        <button
                            onClick={() => updateStatus(booking._id, 'Cancelled')}
                            disabled={booking.status === 'Cancelled'}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ManageBookings
