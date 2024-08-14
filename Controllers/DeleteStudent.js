const StudentSchema = require("../Models/StudentSchema");
const ClassRoom = require("../Models/ClassRoomSchema");

const DeleteStudent = async (req, res) => {
  try {
    const { StudentId } = req.params;

    const student = await StudentSchema.findByIdAndDelete(StudentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        success: false,
      });
    }

    const updateClassrooms = await ClassRoom.updateMany(
      { Students: StudentId },
      { $pull: { Students: StudentId } }
    );

    if (updateClassrooms.modifiedCount > 0) {
      return res.status(200).json({
        message: "Student deleted and removed from classrooms successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Student deleted, but was not found in any classrooms",
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

module.exports = DeleteStudent;
