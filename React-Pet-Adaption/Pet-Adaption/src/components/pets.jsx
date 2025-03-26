import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pets")
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading pets...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="pet-container">
      <h2 className="pet-title">Meet Our Adorable Pets</h2>
      <div className="pet-grid">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className="pet-card" key={pet.petId}>
              <img
                src={pet.image || `https://via.placeholder.com/200?text=${pet.petName}`}
                alt={pet.petName}
                className="pet-image"
              />
              <h3 className="pet-name">{pet.petName}</h3>
              <p className="pet-age">Age: {pet.petAge} years</p>
              <p className="pet-description">{pet.description}</p>
              <Link to={`/pets/${pet.petId}`} className="view-details">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="no-pets-text">No pets available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default PetList;
