const StudentSchema = require('../Models/StudentSchema');

const GetStudentById = async (req, res) => {
  const StudentId = req.params.StudentId;
  
  try {
    const Student = await StudentSchema.findById(StudentId);

    if (!Student) {
      return res.status(404).json({
        message: 'Student not found',
        error: true,
      });
    }

    return res.status(200).json({
      data: Student,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
    });
  }
};

module.exports = GetStudentById;
