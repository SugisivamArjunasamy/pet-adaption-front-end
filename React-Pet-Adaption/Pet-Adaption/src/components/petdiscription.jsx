import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";

const SinglePetDescription = () => {
  const { id } = useParams(); // Get pet ID from URL
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:8080/api/pets/${id}`)
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
    <div className="single-pet-container">
      <div className="pet-image-container">
        <img src={pet.image} alt={pet.name} className="single-pet-image" />
      </div>
      <div className="pet-info">
        <h2 className="pet-name">{pet.name}</h2>
        <p className="pet-age">Age: {pet.age} years</p>
        <p className="pet-description">{pet.description}</p>
        <p className="pet-details">Breed: {pet.breed}</p>
        <p className="pet-details">Location: {pet.location}</p>
        <p className="pet-details">Health Status: {pet.healthStatus}</p>
      </div>
    </div>
  );
};

export default SinglePetDescription;
