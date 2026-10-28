
import { Link } from 'react-router-dom'
import './About.css'

function About() {
    return (
        <div className="about-page">

            {/* Page Banner */}
            <section className="about-banner">
                <h1>About Explore Sri Lanka</h1>
                <p>Discover the island. Experience the journey.</p>
            </section>

            {/* Introduction */}
            <section className="about-intro">
                <div className="about-intro-text">
                    <h2>Welcome to Explore Sri Lanka</h2>

                    <p>
                        Explore Sri Lanka – Journey Beyond Limits is a
                        travel booking platform designed to help tourists
                        explore the beauty, culture and natural attractions
                        of Sri Lanka.
                    </p>

                    <p>
                        Our platform allows travellers to discover tour
                        packages, view detailed itineraries and submit
                        booking requests based on their travel preferences.
                    </p>
                </div>

                <img
                    src="/images/hero.jpg"
                    alt="Beautiful scenery in Sri Lanka"
                />
            </section>

            {/* Mission and Vision */}
            <section className="about-mission">
                <div className="about-info-card">
                    <h2>Our Mission</h2>
                    <p>
                        To make exploring Sri Lanka simple and convenient
                        by providing organised tour packages and an
                        easy-to-use travel booking platform.
                    </p>
                </div>

                <div className="about-info-card">
                    <h2>Our Vision</h2>
                    <p>
                        To help visitors discover Sri Lanka's cultural
                        heritage, natural beauty and memorable travel
                        experiences through one platform.
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className="about-services">
                <h2>What We Offer</h2>

                <div className="about-services-grid">
                    <div>
                        <h3>Tour Packages</h3>
                        <p>
                            Explore organised one-day, three-day
                            and five-day tour packages.
                        </p>
                    </div>

                    <div>
                        <h3>Travel Preferences</h3>
                        <p>
                            Request vehicle types and guide language
                            preferences when making a booking.
                        </p>
                    </div>

                    <div>
                        <h3>Accommodation Arrangements</h3>
                        <p>
                            Accommodation for multi-day packages
                            is arranged by our travel team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta">
                <h2>Start Your Journey with Us</h2>
                <p>Explore our available tours and plan your next adventure.</p>

                <Link to="/packages" className="about-button">
                    Explore Tour Packages
                </Link>
            </section>

        </div>
    )
}

export default About
