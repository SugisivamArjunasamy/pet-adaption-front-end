import React from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">PetAdoption</div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link" activeclassname="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/listpets" className="nav-link" activeclassname="active-link">
              Pets
            </NavLink>
          </li>
          <li>
          <NavLink to="/adaption" className="nav-link" activeclassname="active-link">
              Adaption Process
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link" activeclassname="active-link">
              about
            </NavLink>
          </li>
          <button className="cta-button" onClick={()=>navigate('/login')}>Login</button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;