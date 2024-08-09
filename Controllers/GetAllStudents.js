const StudentSchema = require("../Models/StudentSchema");

const GettingAllStudentsData = async (req, res) => {
  try {
    const AllStudent = await StudentSchema.find();
    return res.status(201).json({
      message: "Geting All Students Succesfully",
      data: AllStudent,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error || "Internal Server Error",
      error: true,
    });
  }
};

module.exports = GettingAllStudentsData;
