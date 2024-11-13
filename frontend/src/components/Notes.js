import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/notes",
      { content: note },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes([...notes, response.data]);
    setNote("");
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/register");
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
        <h1
          style={{
            ...styles.header,
            color: isDarkMode ? "#fff" : "#444",
          }}
        >
          My Notes
        </h1>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type your note here..."
          style={{
            ...styles.input,
            color: isDarkMode ? "#fff" : "#444",
            backgroundColor: isDarkMode ? "#555" : "#fff",
          }}
        />
        <button
          onClick={handleAddNote}
          style={{
            ...styles.button,
            backgroundColor: isDarkMode ? "#388e3c" : "#2e7d32",
          }}
        >
          Add Note
        </button>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note._id} style={styles.note}>
              <pre
                style={{
                  color: isDarkMode ? "#fff" : "#444",
                  backgroundColor: isDarkMode ? "#555" : "#f0f0f0",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                {note.content}
              </pre>
              <button
                onClick={() => handleDeleteNote(note._id)}
                style={{
                  ...styles.deleteButton,
                  backgroundColor: isDarkMode ? "#d32f2f" : "#c62828",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button onClick={toggleTheme} style={styles.themeToggle}>
          {isDarkMode ? "🌞" : "🌙"}
        </button>
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "20px",
            right: "220px",
            background: "none",
            border: "none",
            fontSize: "25px",
            color: isDarkMode ? "#fff" : "#444",
            cursor: "pointer",
          }}
        >
          🏠︎
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
    height: "100vh",
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
  },
  header: {
    fontSize: "30px",
    marginBottom: "20px",
    fontWeight: "500",
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
    transition: "background-color 0.3s ease",
  },
  note: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: "15px 0",
    padding: "15px",
    borderRadius: "8px",
  },
  deleteButton: {
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  themeToggle: {
    position: "absolute",
    top: "20px",
    left: "220px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 2,
  },
};

export default Notes;
