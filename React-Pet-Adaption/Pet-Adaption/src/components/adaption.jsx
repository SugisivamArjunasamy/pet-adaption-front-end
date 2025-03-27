import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";

const Adoption = () => {
  const { petId } = useParams(); 
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/${petId}`) 
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) => {
        console.error("Error fetching pet details:", error);
        setPet({ image: "https://via.placeholder.com/600x400?text=No+Image" });
      });
  }, []);

  return (
    <section className="adoption-section">
      <h2 className="adoption-title">Adoption Process</h2>

      {pet && (
        <img
          src={pet.image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={pet.petName || "Adopt a Pet"}
          className="adoption-image"
          onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available")}
        />
      )}

      <p className="adoption-text">
        Begin your journey to adopting {pet?.petName || "a loving pet"} today! Fill out the form below, and we will contact you with the next steps.
      </p>

      <form className="adoption-form">
        <input type="text" placeholder="Pet Name" required className="input-field" />
        <input type="text" placeholder="Your Name" required className="input-field" />
        <input type="email" placeholder="Email" required className="input-field" />
        <input type="text" placeholder="Amount" required className="input-field" />
        <button type="submit" className="adoption-button">Start Adoption Process</button>
      </form>
    </section>
  );
};

export default Adoption;
