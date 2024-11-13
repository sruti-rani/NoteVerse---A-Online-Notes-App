import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Only use useNavigate

import { Link } from "react-router-dom";
import Login from "./Login";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Use navigate here

  const handleRegister = async () => {
    try {
      // Send the register request to your API
      await axios.post("http://localhost:5000/api/auth/register", { username, password });
      
      // On successful registration, navigate to login page
      navigate("/login");  // Correct use of navigate for redirection
    } catch (err) {
      // Handle errors such as existing username or server issue
      setError("Username already exists or server error");
    }
  };

  return (
    <div className="auth-container">
     
      <h3>Welcome to Collaborative notes APP!🙂</h3>

      <h1>Register</h1>


      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}  {/* Display error message if any */}
      <button onClick={handleRegister}>Register</button>

      <Link to="login">Already Have an Account? Login</Link>

      
    </div>

  );
}

export default Register;
