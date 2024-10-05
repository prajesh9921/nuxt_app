const mongoose = require("mongoose");

// Define the note schema correctly
const noteSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Define the group schema
const groupsSchema = new mongoose.Schema(
  {
    grpName: {
      type: String,
      required: true,
    },
    initialLetters: {
      type: String,
      required: false,
    },
    selectedColor: {
      type: String,
      required: true,
    },
    notes: {
      type: [noteSchema],
      required: false,
    }
  },
  { timestamps: true }
);

// Correct model creation
const Group = mongoose.model("Group", groupsSchema);

module.exports = Group;
