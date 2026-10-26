
import { useEffect, useState } from 'react'
import './Packages.css'

function Packages() {
    const [packages, setPackages] = useState([])
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [duration, setDuration] = useState('all')
    const [sort, setSort] = useState('default')

    useEffect(() => {
        fetch('http://localhost:5000/api/packages')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load packages')
                }
                return response.json()
            })
            .then(data => setPackages(data))
            .catch(() => setError('Could not load tour packages'))
    }, [])

    const filteredPackages = packages.filter(pkg => {
        const searchText = search.toLowerCase()

        const matchesSearch =
            pkg.name.toLowerCase().includes(searchText) ||
            pkg.destination.toLowerCase().includes(searchText)

        const matchesDuration =
            duration === 'all' || pkg.duration === Number(duration)

        return matchesSearch && matchesDuration
    })

    if (sort === 'low') {
        filteredPackages.sort((a, b) => a.price - b.price)
    }

    if (sort === 'high') {
        filteredPackages.sort((a, b) => b.price - a.price)
    }

    return (
        <div className="packages-page">
            <h1>Explore Our Tour Packages</h1>
            <p>Find your perfect Sri Lankan adventure.</p>

            <div className="package-filters">
                <input
                    type="text"
                    placeholder="Search packages or destinations"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                >
                    <option value="all">All Durations</option>
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                </select>

                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="default">Default Sorting</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="package-list">
                {filteredPackages.map(pkg => (
                    <div className="package-card" key={pkg._id}>
                        <h2>{pkg.name}</h2>
                        <p>Destination: {pkg.destination}</p>
                        <p>Duration: {pkg.duration} Days</p>
                        <p>{pkg.description}</p>
                        <h3>LKR {pkg.price.toLocaleString()}</h3>
                        <button>View Details</button>
                    </div>
                ))}
            </div>

            {filteredPackages.length === 0 && !error && (
                <p>No matching tour packages found.</p>
            )}
        </div>
    )
}

export default Packages
