import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/login/LoginPage';
import Navbar from './layout/Navbar';
import Dasboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dasboard />} />
      </Routes>
    </Router>
  )
};

export default App;
