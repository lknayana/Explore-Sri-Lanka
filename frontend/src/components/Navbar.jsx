
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Explore Sri Lanka</h2>
                <p>Journey Beyond Limits</p>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/packages">Packages</Link>
                <a href="/#destinations">Destinations</a>
                <a href="/#about">About Us</a>
                <a href="/#contact">Contact</a>
                <Link to="/admin">Admin Login</Link>
            </div>
        </nav>
    )
}

export default Navbar
