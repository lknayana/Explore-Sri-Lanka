
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Explore Sri Lanka</h2>
                <p>Journey Beyond Limits</p>
            </div>

            <div className="nav-links">

                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/packages">Packages</NavLink>
                <NavLink to="/destinations">Destinations</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <Link to="/admin/login">Admin Login</Link>
            </div>
        </nav>
    )
}

export default Navbar
