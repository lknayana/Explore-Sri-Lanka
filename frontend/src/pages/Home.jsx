
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [packages, setPackages] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/packages')
            .then(res => res.json())
            .then(data => setPackages(data.slice(0, 3)))
            .catch(() => console.log('Could not load featured packages'))
    }, [])

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-subtitle">WELCOME TO PARADISE</p>

                    <h1>Discover the Beauty of Sri Lanka</h1>

                    <p>
                        From golden beaches to misty mountains,
                        your unforgettable journey begins here.
                    </p>

                    <a href="#welcome" className="hero-button">
                        Discover More
                    </a>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="welcome" id="welcome">
                <h2>Welcome to Explore Sri Lanka</h2>
                <p>
                    Discover the beauty, culture and adventure of Sri Lanka
                    through our carefully planned travel experiences.
                </p>
            </section>

            {/* Featured Packages */}
            <section className="home-section">
                <h2>Our Featured Tour Packages</h2>
                <p>Choose your next unforgettable journey.</p>

                <div className="home-package-grid">
                    {packages.map(pkg => (
                        <div className="home-package-card" key={pkg._id}>
                            <img
                                src={pkg.image || '/images/hero.jpg'}
                                alt={pkg.name}
                            />

                            <div className="home-package-content">
                                <h3>{pkg.name}</h3>
                                <p>
                                    {pkg.destination} | {pkg.duration} {pkg.duration === 1 ? 'Day' : 'Days'}
                                </p>
                                <h4>LKR {pkg.price.toLocaleString()}</h4>

                                <Link to={`/packages/${pkg._id}`}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/packages" className="view-all-button">
                    View All Packages
                </Link>
            </section>

            {/* Destinations */}
            <section className="home-section destinations" id="destinations">
                <h2>Popular Destinations</h2>
                <p>Discover some of Sri Lanka's beautiful destinations.</p>

                <div className="destination-grid">
                    <div>
                        <img src="/images/kandy.jpeg" alt="Kandy" />
                        <h3>Kandy</h3>
                    </div>

                    <div>
                        <img src="/images/hero.jpg" alt="Ella" />
                        <h3>Ella</h3>
                    </div>

                    <div>
                        <img src="/images/sigiriya.jpg" alt="Sigiriya" />
                        <h3>Sigiriya</h3>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="home-section">
                <h2>Why Choose Explore Sri Lanka?</h2>

                <div className="features-grid">
                    <div>
                        <h3>Carefully Planned Tours</h3>
                        <p>Explore Sri Lanka through organised tour packages.</p>
                    </div>

                    <div>
                        <h3>Beautiful Destinations</h3>
                        <p>Discover the country's natural beauty and culture.</p>
                    </div>

                    <div>
                        <h3>Easy Booking Requests</h3>
                        <p>Choose a package and submit your travel preferences.</p>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="home-section about-section" id="about">
                <h2>About Explore Sri Lanka</h2>
                <p>
                    Explore Sri Lanka is a travel booking platform designed
                    to help visitors discover tour packages, explore destinations
                    and request their preferred travel experiences.
                </p>
            </section>

            {/* Contact */}
            <section className="home-section" id="contact">
                <h2>Contact Us</h2>
                <p>
                    Have a question about our tour packages?
                    Contact our travel team for more information.
                </p>
                <p>
                    Explore our available packages and submit a booking request
                    to begin planning your journey.
                </p>

                <Link to="/packages" className="view-all-button">
                    Explore Packages
                </Link>
            </section>


        </>
    )
}

export default Home
