import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const PetDescription = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading pet details...</p>;
  if (!pet) return <p className="error-text">Pet not found.</p>;

  return (
    <div className="pet-detail-container">
      <button className="close-button" onClick={() => navigate(-1)}>✖</button>

      <div className="pet-detail-content">
        {/* Left: Image */}
        <div className="pet-detail-image-container">
          <img
            src={pet.imageUrl && pet.imageUrl.startsWith("http") ? pet.imageUrl : `https://via.placeholder.com/300?text=${pet.petName}`}
            alt={pet.petName}
            className="pet-detail-image"
            onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
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
          <button className="bta-button" onClick={() => navigate('/adaption')}>Adopt Pet</button>
        </div>
      </div>
    </div>
  );
};

export default PetDescription;
