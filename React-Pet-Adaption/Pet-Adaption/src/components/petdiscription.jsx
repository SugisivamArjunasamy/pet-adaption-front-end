import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const PetDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/pets/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch pet data.");

        const data = await response.json();
        setPet(data);
        setImageError(false); // Reset image error when data is loaded
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching pet:", error);
          setError("Failed to load pet data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPet();

    return () => controller.abort(); // Cleanup function to prevent re-fetching
  }, [id]);

  const handleAdoption = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.userId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/adoption-requests/create?petId=${id}&userId=${storedUser.userId}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Failed to submit adoption request.");

      alert("Adoption request submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Adoption request error:", error);
      alert("Failed to submit adoption request.");
    }
  };

  if (loading) return <p className="loading-text">Loading pet details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="pet-detail-container">
      <button className="close-button" onClick={() => navigate(-1)}>✖</button>
      <div className="pet-detail-content">
        <div className="pet-detail-image-container">
          <img
            src={
              imageError || !pet?.image?.startsWith("http")
                ? "https://via.placeholder.com/300?text=No+Image"
                : pet.image
            }
            alt={pet?.petName}
            className="pet-detail-image"
            onError={() => setImageError(true)} // Set image error once
          />
        </div>
        <div className="pet-detail-info">
          <h2 className="pet-detail-name">{pet?.petName}</h2>
          <p className="pet-detail-age">Age: {pet?.petAge} years</p>
          <p className={`pet-detail-status ${pet?.status === "Available" ? "available" : "unavailable"}`}>
            Status: {pet?.status}
          </p>
          <p className="pet-detail-breed">Breed: {pet?.breed}</p>
          <p className="pet-detail-category">Category: {pet?.category}</p>
          <p className="pet-detail-amount">Adoption Fee: ${pet?.amount}</p>
          <p className="pet-detail-description">{pet?.description}</p>
          <button className="bta-button" onClick={handleAdoption}>Adopt Pet</button>
        </div>
      </div>
    </div>
  );
};

export default PetDescription;
