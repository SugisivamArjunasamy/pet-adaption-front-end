import React from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";

const Navbar = ({ userLoggedIn }) => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        Pet Adoption
      </NavLink>
      <div className="nav-links">
        <NavLink to="/listpets" className="nav-link">
          Adopt a Pet
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        {userLoggedIn ? (
          <>
            <NavLink to="/profile" className="nav-link">
              <img src="/profile-icon.png" alt="Profile" className="profile-icon" />
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
