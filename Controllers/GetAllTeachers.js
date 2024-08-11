const TeachersSchema = require("../Models/TeacherSchema");

const GettingAllTeachersData = async (req, res) => {
  try {
    const AllTeachers = await TeachersSchema.find().select("-Password");
    return res.status(201).json({
      message: "Geting All Teachers Succesfully",
      data: AllTeachers,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error || "Internal Server Error",
      error: true,
    });
  }
};

module.exports = GettingAllTeachersData;
