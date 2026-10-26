import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Explore Sri Lanka</h2>
                <p>Journey Beyond Limits</p>
            </div>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="#packages">Packages</a>
                <a href="#destinations">Destinations</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#admin">Admin Login</a>
            </div>
        </nav>
    )
}

export default Navbar