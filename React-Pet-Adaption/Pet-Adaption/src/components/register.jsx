import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    role: "Adopter",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register button clicked!");
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      console.log("Response received:", response);
      
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      
      console.log("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
    }
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
          <button type="submit" className="register-button">Register</button>

          <p>Already have an account? 
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
