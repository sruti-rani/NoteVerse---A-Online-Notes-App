const express = require("express");
const router = express.Router();
const { getNotes, addNote, deleteNote } = require("../controllers/notesController");
const jwt = require("jsonwebtoken");

// Middleware to authenticate user
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.userId;
    next();
  });
};

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, addNote);
router.delete("/:noteId", authMiddleware, deleteNote);

module.exports = router;
