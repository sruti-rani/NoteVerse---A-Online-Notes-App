import React, { useState, useEffect } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(null);

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
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNotes([...notes, response.data]);
    setNote(""); // Reset note input
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="notes-container">
      <h1>My Notes</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your note here..."
      />
      <button onClick={handleAddNote}>Add Note</button>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <pre>{note.content}</pre>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
