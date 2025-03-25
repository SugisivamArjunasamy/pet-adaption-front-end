import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import About from "./components/about";
import Home from "./components/home.jsx";
import Footer from "./components/footer";
import Navbar from "./components/navebar"; 
import PetList from "./components/pets.jsx";
import Login from "./components/login.jsx";
import "./styles.css";

const App = () => {
  return (
    <Router> 
      <div className="landing-page">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listpets" element={<PetList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
