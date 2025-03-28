import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const UserProfile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${id}`) 
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!user) return <p className="error-text">User not found.</p>;

  return (
    <div className="user-profile-container">
      <button className="close-button" onClick={() => navigate(-1)}>✖</button>

      <div className="user-profile-content">
        {/* User Info */}
        <div className="user-profile-info">
          <h2 className="user-profile-name">{user.userName}</h2>
          <p className="user-profile-email">Email: {user.email}</p>
          <p className="user-profile-role">Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
