
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
                <Link to="/destinations">Destinations</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/admin/login">Admin Login</Link>
            </div>
        </nav>
    )
}

export default Navbar
