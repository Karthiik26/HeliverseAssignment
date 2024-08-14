const ClassRoom = require("../Models/ClassRoomSchema");
const StudentSchema = require("../Models/StudentSchema");

const AssignStudentInsideClassRoom = async (req, res) => {
  try {
    const { studentId, classroomId } = req.body;

    const student = await StudentSchema.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const classroom = await ClassRoom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    const isStudentAssigned = await ClassRoom.findOne({ Students: studentId });
    if (isStudentAssigned) {
      return res.status(400).json({
        error: "Student already assigned to another classroom",
      });
    }

    if (classroom.Students.includes(studentId)) {
      return res.status(400).json({
        error: "Student already assigned to this classroom",
      });
    }

    classroom.Students.push(studentId);
    await classroom.save();

    res.status(200).json({
      success: true,
      message: "Student added to classroom successfully",
      classroom: classroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: true });
  }
};

module.exports = AssignStudentInsideClassRoom;
