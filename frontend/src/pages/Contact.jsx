
import { Link } from 'react-router-dom'
import './Contact.css'

function Contact() {
    return (
        <div className="contact-page">

            {/* Page Banner */}
            <section className="contact-banner">
                <h1>Contact Us</h1>
                <p>We're here to help you plan your journey</p>
            </section>

            {/* Introduction */}
            <section className="contact-intro">
                <h2>Get in Touch</h2>
                <p>
                    Have a question about our tour packages?
                    Explore our available travel experiences and
                    submit a booking request through our website.
                </p>
            </section>

            {/* Information Cards */}

            <section className="contact-grid">

                <div className="contact-card">
                    <h2>Our Office</h2>
                    <p><strong>Address:</strong></p>
                    <p>No. 25, Galle Road,<br />Colombo 03, Sri Lanka</p>
                </div>

                <div className="contact-card">
                    <h2>Call Us</h2>
                    <p><strong>Telephone:</strong></p>
                    <p>+94 11 444 3322</p>
                    <p>For tour and travel inquiries</p>
                </div>

                <div className="contact-card">
                    <h2>Email Us</h2>
                    <p><strong>Email:</strong></p>
                    <p>info@exploresrilanka.example</p>
                    <p>For tour package information and inquiries</p>
                </div>

            </section>




            {/* Booking Steps */}
            <section className="contact-steps">
                <h2>How to Make a Booking Request</h2>

                <div className="contact-steps-grid">
                    <div>
                        <span>01</span>
                        <h3>Explore Packages</h3>
                        <p>Browse our available tour packages.</p>
                    </div>

                    <div>
                        <span>02</span>
                        <h3>Choose Your Tour</h3>
                        <p>Read the itinerary and included services.</p>
                    </div>

                    <div>
                        <span>03</span>
                        <h3>Submit Your Request</h3>
                        <p>Enter your details and travel preferences.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="contact-cta">
                <h2>Ready for Your Next Adventure?</h2>
                <p>Browse our packages and begin planning your journey.</p>

                <Link to="/packages" className="contact-button">
                    View Tour Packages
                </Link>
            </section>

        </div>
    )
}

export default Contact
