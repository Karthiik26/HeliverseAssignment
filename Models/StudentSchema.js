const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
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
    Rollno: {
      type: Number,
      required: [true, "Provide Roll No"],
      unique: true,
    },
    Age: {
      type: Number,
      required: [true, "Provide Age"],
    },
    ClassroomId: [],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
