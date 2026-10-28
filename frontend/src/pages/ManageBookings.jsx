
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ManageBookings.css'

function ManageBookings() {
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('dateLatest')

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
                const data = await response.json().catch(() => ({}))
                throw new Error(data.message || 'Could not update booking')
            }

            setBookings(previous =>
                previous.map(booking =>
                    booking._id === id
                        ? { ...booking, status }
                        : booking
                )
            )

            setMessage('Booking status updated successfully')

        } catch (err) {
            setError(err.message)
        }
    }


    const filteredBookings = bookings
        .filter(booking => {
            const matchesStatus =
                filter === 'All' || booking.status === filter

            const searchText = search.toLowerCase().trim()

            const matchesSearch =
                booking.customerName.toLowerCase().includes(searchText) ||
                (booking.packageId?.name || '')
                    .toLowerCase()
                    .includes(searchText)

            return matchesStatus && matchesSearch
        })
        .sort((a, b) => {
            if (sortBy === 'dateLatest') {
                return new Date(b.travelDate) - new Date(a.travelDate)
            }

            if (sortBy === 'dateEarliest') {
                return new Date(a.travelDate) - new Date(b.travelDate)
            }

            if (sortBy === 'nameAZ') {
                return a.customerName.localeCompare(b.customerName)
            }

            if (sortBy === 'nameZA') {
                return b.customerName.localeCompare(a.customerName)
            }

            return 0
        })


    const pending = bookings.filter(
        booking => booking.status === 'Pending'
    ).length

    const confirmed = bookings.filter(
        booking => booking.status === 'Confirmed'
    ).length

    const cancelled = bookings.filter(
        booking => booking.status === 'Cancelled'
    ).length

    if (!token) return null

    return (
        <main className="manage-bookings">

            {/* Header */}
            <header className="bookings-topbar">
                <div>
                    <p className="bookings-brand">
                        EXPLORE SRI LANKA · ADMIN
                    </p>
                    <h1>Booking Management</h1>
                </div>

                <Link to="/admin" className="bookings-back">
                    Tour Package Dashboard
                </Link>
            </header>

            <div className="bookings-content">

                {/* Booking Summary */}
                <section
                    className="bookings-summary"
                    aria-label="Booking status overview"
                >
                    <div className="booking-summary-item">
                        <span>Total Requests</span>
                        <strong>{bookings.length}</strong>
                    </div>

                    <div className="booking-summary-item">
                        <span>Pending</span>
                        <strong>{pending}</strong>
                    </div>

                    <div className="booking-summary-item">
                        <span>Confirmed</span>
                        <strong>{confirmed}</strong>
                    </div>

                    <div className="booking-summary-item">
                        <span>Cancelled</span>
                        <strong>{cancelled}</strong>
                    </div>
                </section>

                {/* Customer Bookings */}
                <section className="bookings-panel">

                    <div className="bookings-heading">
                        <div>
                            <h2>Customer Booking Requests</h2>
                            <p>
                                Review travel details and confirm
                                or cancel requests.
                            </p>
                        </div>


                        <div className="bookings-controls">

                            <label className="bookings-filter">
                                Search Bookings

                                <input
                                    type="text"
                                    placeholder="Customer or package..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </label>

                            <label className="bookings-filter">
                                Filter by Status

                                <select
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                >
                                    <option value="All">All Bookings</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </label>

                            <label className="bookings-filter">
                                Sort By

                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                >
                                    <option value="dateLatest">
                                        Travel Date: Latest First
                                    </option>

                                    <option value="dateEarliest">
                                        Travel Date: Earliest First
                                    </option>

                                    <option value="nameAZ">
                                        Customer Name: A-Z
                                    </option>

                                    <option value="nameZA">
                                        Customer Name: Z-A
                                    </option>
                                </select>
                            </label>

                        </div>

                    </div>

                    {error && (
                        <p className="booking-error" role="alert">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="booking-success" role="status">
                            {message}
                        </p>
                    )}

                    {loading && (
                        <p className="booking-empty">
                            Loading bookings...
                        </p>
                    )}

                    {!loading && bookings.length === 0 && !error && (
                        <p className="booking-empty">
                            No booking requests available.
                        </p>
                    )}

                    {!loading &&
                        bookings.length > 0 &&
                        filteredBookings.length === 0 && (
                            <p className="booking-empty">
                                No bookings match this status.
                            </p>
                        )}


                    <div className="booking-table-container">
                        <table className="booking-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Tour Package</th>
                                    <th>Travel Date</th>
                                    <th>Travellers</th>
                                    <th>Vehicle</th>
                                    <th>Guide Details</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading && filteredBookings.map(booking => (
                                    <tr key={booking._id}>

                                        <td>
                                            <strong>{booking.customerName}</strong>

                                            <span className="booking-subtext">
                                                {booking.email}
                                            </span>

                                            <span className="booking-subtext">
                                                {booking.phone}
                                            </span>
                                        </td>

                                        <td>
                                            {booking.packageId?.name ||
                                                'Package unavailable'}
                                        </td>

                                        <td>
                                            {String(booking.travelDate).slice(0, 10)}
                                        </td>

                                        <td>{booking.travellers}</td>

                                        <td>{booking.vehicleType}</td>

                                        <td>
                                            <strong>{booking.guideLanguage}</strong>

                                            <span className="booking-subtext">
                                                {booking.guideCount} guide(s)
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`booking-status status-${booking.status.toLowerCase()}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="booking-table-actions">
                                                <button
                                                    type="button"
                                                    className="booking-confirm-button"
                                                    onClick={() =>
                                                        updateStatus(booking._id, 'Confirmed')
                                                    }
                                                    disabled={booking.status === 'Confirmed'}
                                                >
                                                    Confirm
                                                </button>

                                                <button
                                                    type="button"
                                                    className="booking-cancel-button"
                                                    onClick={() =>
                                                        updateStatus(booking._id, 'Cancelled')
                                                    }
                                                    disabled={booking.status === 'Cancelled'}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default ManageBookings
