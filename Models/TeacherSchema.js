const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Provide ClassRoom Name"],
      unique: true,
    },
    Email: {
      type: String,
      required: [true, "Provide Principle Email"],
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Provide Password"],
    },
    ClassroomId: []
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
