const Note = require("../models/Note");

getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ pinned: -1, createdAt: -1 }).select("-_id created_At updated_At");
    res.json({message: "Notes fetched successfully", data: notes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body).select("-_id created_At updated_At");
    res.status(201).json({message: "New note created successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

updateNote = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({message: "Note updated successfully", data: updated});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}