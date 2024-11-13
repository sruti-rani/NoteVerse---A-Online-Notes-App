import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="navbar">
      <Link to="/notes">Notes</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
