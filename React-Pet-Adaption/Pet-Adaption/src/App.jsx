import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home.jsx";
import Footer from "./components/footer";
import Navbar from "./components/navebar";
import PetList from "./components/pets.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Adaption from "./components/adaption.jsx";
import PetDescription from "./components/petdiscription.jsx";
import Profile from "./components/userprofile.jsx";
import AdminDashboard from "./components/admin.jsx";
import "./styles.css";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <Router>
      <div className="landing-page">
        <Navbar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listpets" element={<PetList />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adaption" element={<Adaption />} />
          <Route path="/pets/:id" element={<PetDescription />} />
          <Route path="/profile" element={<Profile userLoggedIn={userLoggedIn} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;