import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie Search App</Link>
            </div>

            <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
                <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/favorites" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Favorites</Link>
                <Link to="/watch-later" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Watch Later</Link>
            </div>

            <div className="hamburger" onClick={toggleMobileMenu}>
                ☰
            </div>
        </nav>
    );
}

export default NavBar;
