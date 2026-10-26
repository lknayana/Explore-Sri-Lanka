import './AdminDashboard.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
                if (!res.ok) throw new Error('Failed to load packages')
                return res.json()
            })
            .then(data => setPackages(data))
            .catch(() => setError('Could not load packages'))
    }

    useEffect(() => {
        loadPackages()
    }, [])


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
            includedServices
        }

        let url = 'http://localhost:5000/api/packages'
        let method = 'POST'

        if (editingId) {
            url = `http://localhost:5000/api/packages/${editingId}`
            method = 'PUT'
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(packageData)
            })

            if (handleUnauthorized(response)) return

            if (!response.ok) {
                throw new Error('Could not save package')
            }

            setMessage(editingId
                ? 'Package updated successfully!'
                : 'Package added successfully!')

            setName('')
            setDuration('')
            setDestination('')
            setPrice('')
            setDescription('')
            setEditingId(null)
            setImage('')
            setItinerary('')
            setIncludedServices('')

            loadPackages()
        } catch (error) {
            setError('Could not save package')
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

        setMessage('')
        setError('')
        window.scrollTo(0, 0)
    }

    async function deletePackage(id) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this package?'
        )

        if (!confirmed) {
            return
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/packages/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (handleUnauthorized(response)) return

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Could not delete package')
            }

            setMessage('Package deleted successfully!')
            setError('')

            if (editingId === id) {
                setEditingId(null)
                setName('')
                setDuration('')
                setDestination('')
                setPrice('')
                setDescription('')
                setImage('')
                setItinerary('')
                setIncludedServices('')
            }

            loadPackages()
        } catch (error) {
            setError(error.message)
        }
    }


    function logout() {
        sessionStorage.removeItem('adminToken')
        navigate('/admin/login', { replace: true })
    }

    if (!token) {
        return null
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-actions">
                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
                <Link to="/admin/bookings" className="manage-bookings-link">
                    Manage Bookings
                </Link>
            </div>
            <h2>Manage Tour Packages</h2>

            <h3>Add New Package</h3>

            <form className="package-form" onSubmit={savePackage}>
                <input
                    type="text"
                    placeholder="Package Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Duration (Days)"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    min="1"
                    required
                />

                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Price (LKR)"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    min="0"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />


                <input
                    type="text"
                    placeholder="Image Path (Example: /images/kandy.jpg)"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />


                <textarea
                    placeholder="Tour Itinerary (Enter one activity per line)"
                    value={itinerary}
                    onChange={e => setItinerary(e.target.value)}
                    rows="5"
                />

                <textarea
                    placeholder="Included Services (Enter one service per line)"
                    value={includedServices}
                    onChange={e => setIncludedServices(e.target.value)}
                    rows="5"
                />



                <button type="submit">
                    {editingId ? 'Update Package' : 'Add Package'}
                </button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Available Packages</h3>

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
                            <td>{pkg.name}</td>
                            <td>{pkg.duration} {pkg.duration === 1 ? 'Day' : 'Days'}</td>
                            <td>{pkg.destination}</td>
                            <td>{pkg.price.toLocaleString('en-LK')}</td>
                            <td>
                                <button onClick={() => editPackage(pkg)}>
                                    Edit
                                </button>

                                <button onClick={() => deletePackage(pkg._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {packages.length === 0 && !error && (
                <p>No tour packages available.</p>
            )}
        </div>
    )
}

export default AdminDashboard
