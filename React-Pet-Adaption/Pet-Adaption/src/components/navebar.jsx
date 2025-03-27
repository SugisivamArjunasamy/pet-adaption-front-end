import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import "../styles.css";

const Navbar = () => {
  const userId = 2;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="nav-logo">PetAdoption</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/listpets" className="nav-link">Pets</Link></li>
        <li><Link to="/login" className="cta-button">Login</Link></li>
      
        <li>
          <Link to={`/user/${userId}`} className="profile-icon">
            <FaUserCircle size={28} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
