const ClassRoom = require("../Models/ClassRoomSchema");

const getClassRoomByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const classrooms = await ClassRoom.find({ Teacher: teacherId })
      .populate({
        path: "Teacher",
        select: "Name Email",
      })
      .populate({
        path: "Students",
        select: "Name Email Rollno Age",
      });

    return res
      .status(200)
      .json({ success: true, data: classrooms, message: "Getting Data" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

module.exports = getClassRoomByTeacherId;
