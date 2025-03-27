import { useState, useEffect } from "react";
import "../styles.css";

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    petName: "",
    petAge: "",
    category: "",
    breed: "",
    description: "",
    status: "Available",
    amount: "",
    location: "",
    imageUrl: "", 
  });

  const [editingPet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleAddPet = () => {
    fetch("http://localhost:8080/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json())
      .then((data) => {
        setPets([...pets, data]);
        setNewPet({
          petName: "",
          petAge: "",
          category: "",
          breed: "",
          description: "",
          status: "Available",
          amount: "",
          location: "",
          imageUrl: "", 
        });
      })
      .catch((error) => console.error("Error adding pet:", error));
  };

  const handleDeletePet = (id) => {
    fetch(`http://localhost:8080/api/pets/${id}`, {
      method: "DELETE",
    })
      .then(() => setPets(pets.filter((pet) => pet.petId !== id)))
      .catch((error) => console.error("Error deleting pet:", error));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="form-container">
        <h3>{editingPet ? "Edit Pet" : "Add New Pet"}</h3>
        <input type="text" name="petName" placeholder="Pet Name" value={newPet.petName} onChange={handleChange} />
        <input type="number" name="petAge" placeholder="Pet Age" value={newPet.petAge} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={newPet.category} onChange={handleChange} />
        <input type="text" name="breed" placeholder="Breed" value={newPet.breed} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={newPet.description} onChange={handleChange} />
        <input type="text" name="status" placeholder="Status" value={newPet.status} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" value={newPet.amount} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={newPet.location} onChange={handleChange} />
        <input type="text" name="imageUrl" placeholder="Image URL" value={newPet.imageUrl} onChange={handleChange} />
        
        <button onClick={handleAddPet} className="add-button">
          {editingPet ? "Update Pet" : "Add Pet"}
        </button>
      </div>

      <div className="pet-list">
        <h3>Existing Pets</h3>
        <div className="pet-grid">
          {pets.map((pet) => (
            <div className="pet-card" key={pet.petId}>
              <img 
                src={pet.imageUrl || "https://via.placeholder.com/200"} 
                alt={pet.petName} 
                className="pet-image" 
                onError={(e) => { e.target.src = "https://via.placeholder.com/200"; }}
              />
              <h3>{pet.petName}</h3>
              <p>Age: {pet.petAge} years</p>
              <p>Category: {pet.category}</p>
              <p>Breed: {pet.breed}</p>
              <p>Status: {pet.status}</p>
              <p>Price: ₹{pet.amount}</p>
              <p>Location: {pet.location}</p>
              <button onClick={() => handleDeletePet(pet.petId)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
