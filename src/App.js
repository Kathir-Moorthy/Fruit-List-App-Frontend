import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import FruitList from "./components/FruitList";
import RecycleBin from "./components/RecycleBin";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <ToastContainer />
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/fruits" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fruits" element={isLoggedIn ? <FruitList /> : <Navigate to="/" />} />
        <Route path="/recyclebin" element={isLoggedIn ? <RecycleBin /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;