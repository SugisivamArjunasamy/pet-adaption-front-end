import { useState, useEffect } from "react";

const PetList = () => {
  const [pets, setPets] = useState([]);
  
    useEffect(() => {
      fetch("https://localhost:8080/api/pets") 
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
              <div className="pet-card" key={pet.id}>
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <h3 className="pet-name">{pet.name}</h3>
                <p className="pet-age">Age: {pet.age} years</p>
                <p className="pet-description">{pet.description}</p>
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
