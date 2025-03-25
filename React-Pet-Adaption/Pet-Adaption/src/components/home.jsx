import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Furry Friend</h1>
        <p className="hero-subtitle">Adopt a pet and give them a forever home.</p>
        <button className="bta-button" onClick={()=>navigate('/listpets')}>Browse Pets</button>
      </div>
    </section>
  );
};

export default Home;