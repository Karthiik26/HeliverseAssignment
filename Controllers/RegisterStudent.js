const Student = require("../Models/StudentSchema");
const bcryptjs = require("bcryptjs");

const RegisterStudent = async (req, res) => {
  try {
    const { Name, Email, Password, Rollno, Age } = req.body;

    const existingStudent = await Student.findOne({ Rollno });
    if (existingStudent) {
      return res.status(400).json({
        message: "Roll number already exists. Please use a unique roll number.",
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(Password, salt);

    const payload = {
      Name,
      Email,
      Password: hashPassword,
      Rollno,
      Age,
    };

    const studentSave = new Student(payload);
    const save = await studentSave.save();

    return res.status(201).json({
      message: "Student created successfully",
      data: save,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

module.exports = RegisterStudent;
