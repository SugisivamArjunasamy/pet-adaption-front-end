import React, { useState } from "react";
import "../styles.css";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required!";
    if (!formData.userPassword.trim()) newErrors.userPassword = "Password is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login Data:", formData);
    setErrors({});
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

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
