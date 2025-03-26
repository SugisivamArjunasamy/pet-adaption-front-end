import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required!";
    if (!formData.userPassword.trim()) newErrors.userPassword = "Password is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/auth/${formData.userEmail}`);
      const data = await response.json();
      setLoading(false);
      
      if (!response.ok || !data) {
        setErrors({ apiError: "User not registered!" });
        return;
      }
      
      if (data.password !== formData.userPassword) {
        setErrors({ apiError: "Invalid password!" });
        return;
      }
      
      console.log("Login Successful:", data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrors({ apiError: "Server error. Please try again later." });
    }
  };

  return (
    <section className="login-page">
      <div className="login-content">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="Enter your email"
            value={formData.userEmail}
            onChange={handleChange}
          />
          {errors.userEmail && <p className="error-message">{errors.userEmail}</p>}

          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="Enter your password"
            value={formData.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && <p className="error-message">{errors.userPassword}</p>}
          {errors.apiError && <p className="error-message">{errors.apiError}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>Don't have an account? 
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
