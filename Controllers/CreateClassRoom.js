const ClassRoom = require("../Models/ClassRoomSchema");

const CreateClassRoom = async (req, res) => {
  try {
    const { Name, StartTime, EndTime, Date, Day } = req.body;

    const Payload = {
      Name,
      StartTime,
      EndTime,
      Date,
      Day,
    };

    const ClassRoomSave = new ClassRoom(Payload);
    const Save = await ClassRoomSave.save();

    return res.status(201).json({
      message: "Created ClassRom Succesfully",
      data: Save,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = CreateClassRoom;
