const Student = require("../Models/StudentSchema");
const bcryptjs = require("bcryptjs");

const RegisterStudent = async (req, res) => {
  try {
    const { Name, Email, Password, Rollno, Age } = req.body;

    const Slat = await bcryptjs.genSalt(10);
    const HashPassword = await bcryptjs.hash(Password, Slat);

    const Payload = {
      Name,
      Email,
      Password: HashPassword,
      Rollno,
      Age,
    };

    const StudentSave = new Student(Payload);
    const Save = await StudentSave.save();

    return res.status(201).json({
      message: "Student Created Succesfully",
      data: Save,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = RegisterStudent;
