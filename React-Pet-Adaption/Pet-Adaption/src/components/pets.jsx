import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css"; 

const PetList = () => {
  const [pets, setPets] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/api/pets") 
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  return (
    <div className="pet-container">
      <h2 className="pet-title">Meet Our Adorable Pets</h2>
      <div className="pet-grid">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className="pet-card" key={pet.petId}>
              <img 
                src={pet.imageUrl && pet.imageUrl.startsWith("http") ? pet.imageUrl : `https://via.placeholder.com/200?text=${pet.petName}`} 
                alt={pet.petName} 
                className="pet-image" 
                onError={(e) => e.target.src = "https://via.placeholder.com/200?text=No+Image"}
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
          <p className="loading-text">Loading pets...</p>
        )}
      </div>
    </div>
  );
};

export default PetList;
