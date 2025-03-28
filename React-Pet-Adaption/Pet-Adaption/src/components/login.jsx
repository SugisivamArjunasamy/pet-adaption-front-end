import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { NavLink } from "react-router-dom";

const Login = ({ setUserLoggedIn }) => {
  const [formData, setFormData] = useState({ userEmail: "", userPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required!";
    if (!formData.userPassword.trim()) newErrors.userPassword = "Password is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/auth/${formData.userEmail}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("User not found! Please register.");
      }

      const data = await response.json();

      if (!data?.password || data.password !== formData.userPassword) {
        throw new Error("Incorrect password! Please try again.");
      }

      console.log("Fetching pets for user ID:", data.userId);
      const petsResponse = await fetch(`http://localhost:8080/api/users/${data.userId}/adopted-pets`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      let petsData = [];
      if (petsResponse.ok) {
        petsData = await petsResponse.json();
      } else {
        console.error("Failed to fetch adopted pets.");
      }

      const userData = { ...data, adoptedPets: petsData };
      localStorage.setItem("user", JSON.stringify(userData)); // Correct key
      setUserLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      setErrors({ apiError: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-content">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="userEmail">Email</label>
          <input type="email" name="userEmail" id="userEmail" placeholder="Enter your email" value={formData.userEmail} onChange={handleChange} />
          {errors.userEmail && <p className="error-message">{errors.userEmail}</p>}

          <label htmlFor="userPassword">Password</label>
          <input type="password" name="userPassword" id="userPassword" placeholder="Enter your password" value={formData.userPassword} onChange={handleChange} />
          {errors.userPassword && <p className="error-message">{errors.userPassword}</p>}
          {errors.apiError && <p className="error-message">{errors.apiError}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <NavLink to="/register" className="nav-link">Register</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
