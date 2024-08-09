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
    Rollno: {
      type: String,
      required: [true, "Provide Roll No"],
    },
    Age: {
      type: Number,
      required: [true, "Provide Age"],
    }
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
