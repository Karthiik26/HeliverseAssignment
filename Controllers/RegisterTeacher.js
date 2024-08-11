const Teacher = require("../Models/TeacherSchema");
const bcryptjs = require("bcryptjs");

const RegisterTeacher = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    const existingTeacher = await Teacher.findOne({ Email });
    if (existingTeacher) {
      return res.status(400).json({
        message:
          "Email already exists. Please use a Diffrent & Use The Unique Name",
        success: false,
      });
    }

    const Slat = await bcryptjs.genSalt(10);
    const HashPassword = await bcryptjs.hash(Password, Slat);

    const Payload = {
      Name,
      Email,
      Password: HashPassword,
    };

    const TeacherSave = new Teacher(Payload);
    const Save = await TeacherSave.save();

    return res.status(201).json({
      message: "Teacher Created Succesfully",
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

module.exports = RegisterTeacher;
