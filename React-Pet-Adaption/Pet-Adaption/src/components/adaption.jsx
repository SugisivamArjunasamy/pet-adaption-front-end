import React from 'react';
import '../styles.css';

const Adoption = () => {
  return (
    <section className="adoption-section">
      <h2 className="adoption-title">Adoption Process</h2>

      <img src="https://source.unsplash.com/600x400/?pet,adoption" alt="Adopt a Pet" className="adoption-image" />

      <p className="adoption-text">
        Begin your journey to adopting a loving pet today! Fill out the form below, and we will contact you with the next steps.
      </p>

      <form className="adoption-form">
        <input type="text" placeholder="Your Full Name" required className="input-field" />
        <input type="email" placeholder="Your Email" required className="input-field" />
        <input type="text" placeholder="Phone Number" required className="input-field" />
        <textarea placeholder="Why do you want to adopt?" required className="input-field textarea"></textarea>
        <button type="submit" className="adoption-button">Start Adoption Process</button>
      </form>
    </section>
  );
};

export default Adoption;
