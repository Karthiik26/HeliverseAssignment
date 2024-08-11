const jwt = require("jsonwebtoken");
const PrncipleSchema = require("../Models/PrincipleSchema");
const StudentSchema = require("../Models/StudentSchema");
const TeacherSchema = require("../Models/TeacherSchema");

// Principle Token Data
const getDetailsPrincipleFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const Principle = await PrncipleSchema.findById(decode.id).select('-Password');

  return Principle;
};

// Student Token Data
const getDetailsStudentFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decode)
  const Student = await StudentSchema.findById(decode.id).select('-Password');

  return Student;
};

// Student Token Data
const getDetailsTeacherFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const Teacher = await TeacherSchema.findById(decode.id).select('-Password');

  return Teacher;
};

module.exports = {
  getDetailsPrincipleFromToken,
  getDetailsStudentFromToken,
  getDetailsTeacherFromToken,
};
