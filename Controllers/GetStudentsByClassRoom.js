const {getDetailsStudentFromToken} = require("../Helper/GetDetailsFromToken");

const GettingStudentClassRoom = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const Student = await getDetailsStudentFromToken(token);

    return res.status(200).json({
      message: "Geting Student Classroom Succesfully",
      data: Student,
      success: true,
    });

    // student milega uske under classroom ka id ke base ke uper fetch kar na hai
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = GettingStudentClassRoom;
