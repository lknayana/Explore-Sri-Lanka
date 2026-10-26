import './PackageDetails.css'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function PackageDetails() {
    const { id } = useParams()
    const [pkg, setPkg] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/api/packages/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Package not found')
                }
                return response.json()
            })
            .then(data => setPkg(data))
            .catch(() => setError('Could not load package details'))
    }, [id])

    if (error) {
        return <p style={{ padding: '40px' }}>{error}</p>
    }

    if (!pkg) {
        return <p style={{ padding: '40px' }}>Loading...</p>
    }

    return (
        <div className="details-page">
            <Link to="/packages">Back to Packages</Link>

            <h1>{pkg.name}</h1>
            <img
                src={pkg.image || '/images/hero.jpg'}
                alt={pkg.name}
                className="details-image"
            />

            <p><strong>Destination:</strong> {pkg.destination}</p>
            <p><strong>Duration:</strong> {pkg.duration} Days</p>

            <h2>About This Tour</h2>
            <p>{pkg.description}</p>


            <h2>Tour Itinerary</h2>

            {pkg.itinerary ? (
                <div className="tour-info">
                    {pkg.itinerary.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            ) : (
                <p>Itinerary details will be available soon.</p>
            )}

            <h2>Included Services</h2>

            {pkg.includedServices ? (
                <div className="tour-info">
                    {pkg.includedServices.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            ) : (
                <p>Included services will be updated soon.</p>
            )}


            <h2>LKR {pkg.price.toLocaleString()}</h2>

            <Link to={`/booking/${pkg._id}`} className="booking-button">
                Request Booking
            </Link>
        </div>
    )
}

export default PackageDetails
