import { useState, useEffect } from "react";
import axios from "axios";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pets") 
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading === true) return <p>Loading...</p>;

  return (
    <div>
      <h2>Available Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.petId}>{pet.petName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
