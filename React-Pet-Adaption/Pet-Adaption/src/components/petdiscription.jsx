import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const PetDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = id
      ? `http://localhost:8080/api/pets/${id}`
      : `http://localhost:8080/api/pets`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pet data.");
        }
        return response.json();
      })
      .then((data) => {
        if (id) {
          setPet(data);
        } else {
          setPets(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setError("Failed to load pet data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading pets...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="pet-container">
      {id ? (
        <div className="pet-detail-container">
          <button className="close-button" onClick={() => navigate(-1)}>✖</button>
          <div className="pet-detail-content">
            <div className="pet-detail-image-container">
              <img
                src={pet.image && pet.image.startsWith("http") ? pet.image : `https://via.placeholder.com/300?text=${pet.petName}`}
                alt={pet.petName}
                className="pet-detail-image"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
              />
            </div>
            <div className="pet-detail-info">
              <h2 className="pet-detail-name">{pet.petName}</h2>
              <p className="pet-detail-age">Age: {pet.petAge} years</p>
              <p className={`pet-detail-status ${pet.status === "Available" ? "available" : "unavailable"}`}>
                Status: {pet.status}
              </p>
              <p className="pet-detail-breed">Breed: {pet.breed}</p>
              <p className="pet-detail-category">Category: {pet.category}</p>
              <p className="pet-detail-amount">Adoption Fee: ${pet.amount}</p>
              <p className="pet-detail-description">{pet.description}</p>
              <button className="bta-button" onClick={() => navigate('/adoption')}>Adopt Pet</button>
            </div>
          </div>
        </div>
      ) : (
        <>
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
              <p className="loading-text">No pets available at the moment.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PetDescription;
