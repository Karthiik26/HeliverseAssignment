const { getDetailsStudentFromToken } = require("../Helper/GetDetailsFromToken");

const GettingStudentClassRoom = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    console.log("token"+ token)
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    const Student = await getDetailsStudentFromToken(token);

    if (Student.logout) {
      return res.status(401).json({
        message: Student.message,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Getting Student Classroom Successfully",
      data: Student,
      success: true,
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = GettingStudentClassRoom;
