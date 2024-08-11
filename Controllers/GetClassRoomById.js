const ClassRoomSchema = require('../Models/ClassRoomSchema');

const GetClassRoomById = async (req, res) => {
  // Assuming classRoomId is passed as a URL parameter
  const classRoomId = req.params.classRoomId;
  
  try {
    // Find the classroom by ID and populate related fields
    const classRoom = await ClassRoomSchema.findById(classRoomId)
      .populate('Teacher') // Populate teacher details

    // Check if the classroom was found
    if (!classRoom) {
      return res.status(404).json({
        message: 'ClassRoom not found',
        error: true,
      });
    }

    // Send success response with classroom data
    return res.status(200).json({
      data: classRoom,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching classroom:', error);
    // Send error response
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
    });
  }
};

module.exports = GetClassRoomById;
