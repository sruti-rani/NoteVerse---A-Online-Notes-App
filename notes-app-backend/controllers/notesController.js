const Note = require("../models/Note");

// Get all notes for a user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new note
exports.addNote = async (req, res) => {
  const { content } = req.body;

  try {
    const newNote = new Note({
      userId: req.userId,
      content,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.noteId);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
