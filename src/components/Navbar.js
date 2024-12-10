import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Navbar.css";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    toast.info("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Fruit List App</h1>
      <div className="navbar-links">
        <NavLink to="/fruits" activeClassName="active">
          Fruit List
        </NavLink>
        <NavLink to="/recyclebin" activeClassName="active">
          Recycle Bin
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;