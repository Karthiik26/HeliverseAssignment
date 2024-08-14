const Classroom = require("../Models/ClassRoomSchema");

const GettingStudentList = async (req, res) => {
  try {
    const { StudentId } = req.params;

    const classroom = await Classroom.findOne({
      Students: StudentId,
    })
      .populate({
        path: "Students",
        select: "Name Email Rollno Age",
      })
      .populate({
        path: "Teacher",
        select: "Name",
      });

    if (classroom) {
      const filteredStudents = classroom.Students.filter(
        (student) => student._id.toString() !== StudentId
      );

      return res.status(200).json({
        message:
          "Student's classroom details fetched successfully, excluding current student",
        success: true,
        data: {
          ...classroom._doc,
          Students: filteredStudents,
        },
      });
    } else {
      return res.status(404).json({
        message: "Classroom not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      success: false,
    });
  }
};

module.exports = GettingStudentList;
