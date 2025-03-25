import React from 'react';
import About from './components/about';
import Home from './components/home';
import Footer from './components/footer';
import Navbar from './Components/navebar';
import './styles.css'

const App = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;