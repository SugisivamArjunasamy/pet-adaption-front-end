import React, { useState } from "react";
import "../styles.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleChange} required />
          <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <div className="role-selection">
            <label>
              <input type="radio" name="role" value="admin" checked={formData.role === "admin"} onChange={handleChange} />
              Admin
            </label>
            <label>
              <input type="radio" name="role" value="user" checked={formData.role === "user"} onChange={handleChange} />
              User
            </label>
          </div>
          <button type="submit" className="register-button">Register</button>

          <a>Already have an account? :
          <a>
            <NavLink to="/login" className="nav-link" activeclassname="active-link">
                Login
            </NavLink>
          </a>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
