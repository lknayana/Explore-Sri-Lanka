
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const location = useLocation()

    // Do not show the footer on admin pages
    if (location.pathname.startsWith('/admin')) {
        return null
    }

    return (
        <footer className="site-footer">
            <div className="footer-container">

                <div className="footer-column">
                    <h2>Explore Sri Lanka</h2>
                    <p className="footer-tagline">Journey Beyond Limits</p>
                    <p>
                        Discover beautiful destinations, rich culture
                        and unforgettable travel experiences in Sri Lanka.
                    </p>
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/packages">Tour Packages</Link>
                    <Link to="/destinations">Destinations</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div className="footer-column">
                    <h3>Our Experiences</h3>
                    <p>Cultural Tours</p>
                    <p>Hill Country Adventures</p>
                    <p>Beach Experiences</p>
                    <p>Scenic Journeys</p>
                </div>


                <div className="footer-column">
                    <h3>Get in Touch</h3>

                    <p>No. 25, Galle Road, Colombo 03, Sri Lanka</p>
                    <p>Tel: +94 11 444 3322</p>
                    <p>Email: info@exploresrilanka.example</p>

                    <Link to="/contact">Contact Information</Link>

                </div>


            </div>

            <div className="footer-bottom">
                <p>© 2026 Explore Sri Lanka. All Rights Reserved.</p>
                <p>Academic Project | Journey Beyond Limits</p>
            </div>
        </footer>
    )
}

export default Footer
