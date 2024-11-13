import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/notes"); // Redirect to notes page
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
      }}
    >
      <div style={styles.overlay}></div>
      <div
        style={{
          ...styles.card,
          backgroundColor: isDarkMode ? "#444" : "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2
          style={{
            ...styles.header,
            color: isDarkMode ? "#fff" : "#444",
          }}
        >
          Welcome Back! Please Login 📝
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            ...styles.input,
            color: isDarkMode ? "#fff" : "#444",
            backgroundColor: isDarkMode ? "#555" : "#fff",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...styles.input,
            color: isDarkMode ? "#fff" : "#444",
            backgroundColor: isDarkMode ? "#555" : "#fff",
          }}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{
            ...styles.button,
            backgroundColor: isDarkMode ? "#388e3c" : "#2e7d32",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b5e20")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2e7d32")}
        >
          Login
        </button>
        <Link
          to="/register"
          style={{
            ...styles.link,
            color: isDarkMode ? "white" : "blue", // Link color for dark mode
          }}
        >
          Don't Have an Account? Register
        </Link>
        <button
          id="themeToggle"
          onClick={toggleTheme}
          style={styles.themeToggle}
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110vh",
    backgroundImage:
      'url("https://quickfever.com/wp-content/uploads/2017/01/note-taking-apps-quickfever.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "600px",
    maxWidth: "90%",
    bottom: "20px",
  },
  header: {
    fontSize: "25px",
    marginBottom: "10px",
    fontWeight: "500",
    padding: "25px",
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    color: "white",
    padding: "12px 0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginTop: "15px",
  },
  link: {
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "20px",
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  themeToggle: {
    position: "absolute",
    left: "250px",
    top: "10px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default Login;
