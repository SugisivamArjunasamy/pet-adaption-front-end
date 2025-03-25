import React from 'react';
import '../styles.css';

const Home = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Furry Friend</h1>
        <p className="hero-subtitle">Adopt a pet and give them a forever home.</p>
        <button className="cta-button">Browse Pets</button>
      </div>
    </section>
  );
};

export default Home;