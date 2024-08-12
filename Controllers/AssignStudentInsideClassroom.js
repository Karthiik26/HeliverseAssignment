const ClassRoom = require("../Models/ClassRoomSchema");
const StudentSchema = require("../Models/StudentSchema");

const AssignStudentInsideClassRoom = async (req, res) => {
  try {
    const { studentId, classroomId } = req.body;

    const classroom = await ClassRoom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    if (classroom.Students.includes(studentId)) {
      return res
        .status(400)
        .json({ error: "Student already assigned to this classroom" });
    }

    classroom.Students.push(studentId);
    await classroom.save();

    const populatedClassroom = await ClassRoom.findById(classroomId)
      .populate("Students", "Name Email Rollno Age")
      .populate("Teacher", "Name Email");

    res.status(200).json({
      success: true,
      message: "Student added to classroom successfully",
      classroom: populatedClassroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: true });
  }
};

module.exports = AssignStudentInsideClassRoom;
