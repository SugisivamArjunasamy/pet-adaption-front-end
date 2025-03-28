import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Profile = ({ setUserLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserLoggedIn(false);
    setLoggingOut(true);
  };

  useEffect(() => {
    if (loggingOut) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [loggingOut, navigate]);

  return (
    <section className="profile-page">
      <div className="profile-content">
        {user ? (
          <>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <h2>Adopted Pets</h2>
            <ul>
              {user.adoptedPets && user.adoptedPets.length > 0 ? (
                user.adoptedPets.map((pet) => (
                  <li key={pet.id}>
                    <p>
                      <strong>{pet.name}</strong> - {pet.breed}
                    </p>
                  </li>
                ))
              ) : (
                <p>No adopted pets yet.</p>
              )}
            </ul>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
