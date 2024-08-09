const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Provide ClassRoom Name"],
      unique: true,
    },
    Email: {
      type: Email,
      required: [true, "Provide Principle Email"],
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Provide Password"],
    },
    Classroom: {
      type: String,
      required: [true, "Provide ClassRomm"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
