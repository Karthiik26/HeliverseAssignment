const StudentSchema = require('../Models/StudentSchema');

const GetStudentById = async (req, res) => {
  // Assuming StudentId is passed as a URL parameter
  const StudentId = req.params.StudentId;
  
  try {
    // Find the Student by ID and populate related fields
    const Student = await StudentSchema.findById(StudentId)// Populate teacher details

    // Check if the Student was found
    if (!Student) {
      return res.status(404).json({
        message: 'Student not found',
        error: true,
      });
    }

    // Send success response with Student data
    return res.status(200).json({
      data: Student,
      success: true,
    });
  } catch (error) {
    // console.error('Error fetching Student:', error);
    // Send error response
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
    });
  }
};

module.exports = GetStudentById;
