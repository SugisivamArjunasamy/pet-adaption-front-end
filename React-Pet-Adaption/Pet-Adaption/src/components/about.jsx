import React from 'react';
import '../styles.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="about-title">About PetAdoption</h2>
        <p className="about-text">
          At <strong>PetAdoption</strong>, we believe that every pet deserves a warm and loving home. Our mission is to connect abandoned, rescued, and shelter pets with compassionate families, giving them a second chance at life.
        </p>
        <p className="about-text">
          We work with various animal shelters and organizations to ensure the best care for pets before they find their forever homes. Whether you're looking to adopt, foster, or simply support our cause, your involvement makes a difference!
        </p>

        <div className="about-features">
          <div className="feature">
            <h3>🐶 Adopt a Pet</h3>
            <p>Find the perfect furry friend and give them the love they deserve.</p>
          </div>
          <div className="feature">
            <h3>🏠 Foster a Pet</h3>
            <p>Provide temporary shelter and care for pets in need.</p>
          </div>
          <div className="feature">
            <h3>💖 Support Our Mission</h3>
            <p>Volunteer, donate, or spread awareness to help more pets find homes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
