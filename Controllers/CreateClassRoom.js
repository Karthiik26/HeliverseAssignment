const ClassRoomSchema = require('../Models/ClassRoomSchema')

const CreateClassRoom = async (req, res) => {
  try {
    const { ClassRoomName, TeacherName } = req.body;

    console.log(ClassRoomName)
    console.log(TeacherName)

    if (!ClassRoomName || !TeacherName) {
      return res.status(400).json({
        message: "Please provide valid ClassRoomName and TeacherName.",
        error: true,
      });
    }

    const existingClassRoom = await ClassRoomSchema.findOne({ TeacherName });
    if (existingClassRoom) {
      return res.status(400).json({
        message: `Teacher ${TeacherName} is already assigned to the class '${existingClassRoom.ClassRoomName}'.`,
        error: true,
      });
    }

    const newClassRoom = new ClassRoomSchema({
      Name : ClassRoomName,
      Teacher : TeacherName,
    });

    const savedClassRoom = await newClassRoom.save();

    return res.status(201).json({
      message: "Classroom created successfully.",
      data: savedClassRoom,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Duplicate Error Change Name.",
      errorlog : error,
      error: true,
    });
  }
};

module.exports = CreateClassRoom;
