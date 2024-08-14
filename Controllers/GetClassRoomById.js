const ClassRoomSchema = require('../Models/ClassRoomSchema');

const GetClassRoomById = async (req, res) => {
  const classRoomId = req.params.classRoomId;
  
  try {
    const classRoom = await ClassRoomSchema.findById(classRoomId)
      .populate('Teacher');

    if (!classRoom) {
      return res.status(404).json({
        message: 'ClassRoom not found',
        error: true,
      });
    }

    return res.status(200).json({
      data: classRoom,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching classroom:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
    });
  }
};

module.exports = GetClassRoomById;
