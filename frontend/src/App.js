import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";  // Import your components
import Login from "./components/Login";
import Notes from "./components/Notes";  
import Navbar from './components/Navbar' // Your notes component

function App() {
  return (
    <Router>
    
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />  {/* Make sure this is correct */}
      </Routes>
    </Router>
  );
}

export default App;
