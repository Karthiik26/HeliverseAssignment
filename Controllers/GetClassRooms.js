const ClassRoomSchema = require("../Models/ClassRoomSchema");

const GettingAllClassRooms = async (req, res) => {
  try {
    const AllClassRooms = await ClassRoomSchema.find()
      .populate("Students", "Name Email Rollno Age")
      .populate("Teacher", "Name Email");

    return res.status(201).json({
      message: "Geting All Teachers Succesfully",
      data: AllClassRooms,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error || "Internal Server Error",
      error: true,
    });
  }
};

module.exports = GettingAllClassRooms;
