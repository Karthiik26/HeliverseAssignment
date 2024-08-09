const StudentSchema = require("../Models/StudentSchema");

const DeleteStudent = async (req, res) => {
  try {
    const { StudentId } = req.body;

    const UpdateStudent = await StudentSchema.findByIdAndDelete(studentId);

    if (UpdateStudent) {
      return res.status(200).json({
        message: "Student Deleted Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = EditStudent;
