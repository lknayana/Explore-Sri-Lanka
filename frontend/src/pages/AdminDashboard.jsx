
import './AdminDashboard.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const [packages, setPackages] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [destination, setDestination] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [itinerary, setItinerary] = useState('')
    const [includedServices, setIncludedServices] = useState('')
    const [accommodation, setAccommodation] = useState('')
    const [editingId, setEditingId] = useState(null)

    const navigate = useNavigate()
    const token = sessionStorage.getItem('adminToken')

    useEffect(() => {
        if (!token) {
            navigate('/admin/login', { replace: true })
        }
    }, [token, navigate])

    function handleUnauthorized(response) {
        if (response.status === 401) {
            sessionStorage.removeItem('adminToken')
            navigate('/admin/login', { replace: true })
            return true
        }
        return false
    }

    function loadPackages() {
        fetch('http://localhost:5000/api/packages')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load packages')
                }
                return res.json()
            })
            .then(data => setPackages(data))
            .catch(() => setError('Could not load packages'))
    }

    useEffect(() => {
        loadPackages()
    }, [])

    function clearForm() {
        setName('')
        setDuration('')
        setDestination('')
        setPrice('')
        setDescription('')
        setImage('')
        setItinerary('')
        setIncludedServices('')
        setAccommodation('')
        setEditingId(null)
    }

    async function savePackage(e) {
        e.preventDefault()
        setMessage('')
        setError('')

        const packageData = {
            name,
            duration: Number(duration),
            destination,
            price: Number(price),
            description,
            image,
            itinerary,
            includedServices,
            accommodation
        }

        const url = editingId
            ? `http://localhost:5000/api/packages/${editingId}`
            : 'http://localhost:5000/api/packages'

        const method = editingId ? 'PUT' : 'POST'

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(packageData)
            })

            if (handleUnauthorized(response)) return

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data.message || 'Could not save package')
            }

            setMessage(
                editingId
                    ? 'Package updated successfully!'
                    : 'Package added successfully!'
            )

            clearForm()
            loadPackages()

        } catch (err) {
            setError(err.message)
        }
    }

    function editPackage(pkg) {
        setEditingId(pkg._id)
        setName(pkg.name)
        setDuration(pkg.duration)
        setDestination(pkg.destination)
        setPrice(pkg.price)
        setDescription(pkg.description)
        setImage(pkg.image || '')
        setItinerary(pkg.itinerary || '')
        setIncludedServices(pkg.includedServices || '')
        setAccommodation(pkg.accommodation || '')

        setMessage('')
        setError('')

        document.getElementById('package-editor')?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    async function deletePackage(id) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this package?'
        )

        if (!confirmed) return

        try {
            const response = await fetch(
                `http://localhost:5000/api/packages/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (handleUnauthorized(response)) return

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data.message || 'Could not delete package')
            }

            setMessage('Package deleted successfully!')
            setError('')

            if (editingId === id) {
                clearForm()
            }

            loadPackages()

        } catch (err) {
            setError(err.message)
        }
    }

    function logout() {
        sessionStorage.removeItem('adminToken')
        navigate('/admin/login', { replace: true })
    }

    if (!token) return null

    return (
        <main className="admin-dashboard">

            {/* Header */}
            <header className="admin-topbar">
                <div>
                    <p className="admin-brand">
                        EXPLORE SRI LANKA · ADMIN
                    </p>
                    <h1>Tour Package Management</h1>
                </div>

                <div className="dashboard-actions">
                    <Link
                        to="/admin/bookings"
                        className="admin-nav-link"
                    >
                        Manage Bookings
                    </Link>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="admin-content">

                {/* Overview */}
                <section className="admin-overview">

                    <div className="admin-stat">
                        <span>Total Tour Packages</span>
                        <strong>{packages.length}</strong>
                        <small>Available in the database</small>
                    </div>

                    <div className="admin-stat admin-stat-tip">
                        <span>Quick Access</span>
                        <strong>Bookings</strong>

                        <Link to="/admin/bookings">
                            Review customer requests
                        </Link>
                    </div>

                </section>

                {message && (
                    <p className="admin-alert admin-alert-success" role="status">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="admin-alert admin-alert-error" role="alert">
                        {error}
                    </p>
                )}

                {/* Package Form */}
                <section className="admin-panel" id="package-editor">

                    <div className="admin-section-heading">
                        <div>
                            <h2>
                                {editingId
                                    ? 'Edit Tour Package'
                                    : 'Add New Tour Package'}
                            </h2>

                            <p>
                                Enter the basic information first,
                                then the tour details below.
                            </p>
                        </div>

                        {editingId && (
                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={clearForm}
                            >
                                Cancel Editing
                            </button>
                        )}
                    </div>

                    <form className="package-form" onSubmit={savePackage}>

                        <div className="admin-field">
                            <label htmlFor="package-name">
                                Package Name
                            </label>

                            <input
                                id="package-name"
                                type="text"
                                placeholder="e.g. Kandy Cultural Tour"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                minLength="3"
                            />
                        </div>

                        <div className="admin-field">
                            <label htmlFor="package-destination">
                                Destination
                            </label>

                            <input
                                id="package-destination"
                                type="text"
                                placeholder="e.g. Kandy"
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                required
                            />
                        </div>

                        <div className="admin-field">
                            <label htmlFor="package-duration">
                                Duration
                            </label>

                            <select
                                id="package-duration"
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                                required
                            >
                                <option value="">Select Duration</option>
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
                                <option value="5">5 Days</option>
                            </select>
                        </div>

                        <div className="admin-field">
                            <label htmlFor="package-price">
                                Price (LKR)
                            </label>

                            <input
                                id="package-price"
                                type="number"
                                placeholder="e.g. 18000"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                min="0"
                                required
                            />
                        </div>

                        <div className="admin-field admin-full-width">
                            <label htmlFor="package-description">
                                Package Description
                            </label>

                            <textarea
                                id="package-description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows="3"
                                placeholder="Write a short description of the tour"
                                required
                            />
                        </div>

                        <div className="admin-field admin-full-width">
                            <label htmlFor="package-image">
                                Image Path
                            </label>

                            <input
                                id="package-image"
                                type="text"
                                placeholder="/images/kandy.jpg"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />

                            <small>
                                Use a picture already saved in
                                frontend/public/images.
                            </small>
                        </div>

                        <div className="admin-form-divider admin-full-width">
                            Tour Experience
                        </div>

                        <div className="admin-field admin-full-width">
                            <label htmlFor="package-itinerary">
                                Tour Itinerary
                            </label>

                            <textarea
                                id="package-itinerary"
                                value={itinerary}
                                onChange={e => setItinerary(e.target.value)}
                                rows="5"
                                placeholder="Enter one activity per line"
                            />
                        </div>

                        <div className="admin-field admin-full-width">
                            <label htmlFor="package-services">
                                Included Services
                            </label>

                            <textarea
                                id="package-services"
                                value={includedServices}
                                onChange={e => setIncludedServices(e.target.value)}
                                rows="4"
                                placeholder="Enter one service per line"
                            />
                        </div>

                        {Number(duration) > 1 && (
                            <div className="admin-field admin-full-width">
                                <label htmlFor="package-accommodation">
                                    Accommodation Details
                                </label>

                                <textarea
                                    id="package-accommodation"
                                    value={accommodation}
                                    onChange={e => setAccommodation(e.target.value)}
                                    rows="3"
                                    placeholder="Information about company-arranged accommodation"
                                />
                            </div>
                        )}

                        <div className="admin-form-actions admin-full-width">
                            <button
                                type="submit"
                                className="admin-primary-button"
                            >
                                {editingId
                                    ? 'Update Package'
                                    : 'Add Package'}
                            </button>
                        </div>

                    </form>
                </section>

                {/* Package Table */}
                <section className="admin-panel">

                    <div className="admin-section-heading">
                        <div>
                            <h2>Available Packages</h2>
                            <p>
                                View, edit or delete your saved
                                tour packages.
                            </p>
                        </div>

                        <span className="admin-record-count">
                            {packages.length} packages
                        </span>
                    </div>

                    <div className="admin-table-scroll">
                        <table className="package-table">
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Duration</th>
                                    <th>Destination</th>
                                    <th>Price (LKR)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg._id}>
                                        <td className="admin-package-name">
                                            {pkg.name}
                                        </td>

                                        <td>
                                            {pkg.duration}{' '}
                                            {pkg.duration === 1
                                                ? 'Day'
                                                : 'Days'}
                                        </td>

                                        <td>{pkg.destination}</td>

                                        <td>
                                            {pkg.price.toLocaleString('en-LK')}
                                        </td>

                                        <td className="admin-row-actions">
                                            <button
                                                type="button"
                                                className="admin-edit-button"
                                                onClick={() => editPackage(pkg)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-delete-button"
                                                onClick={() => deletePackage(pkg._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {packages.length === 0 && !error && (
                        <p className="admin-empty">
                            No tour packages available.
                        </p>
                    )}

                </section>
            </div>
        </main>
    )
}

export default AdminDashboard
