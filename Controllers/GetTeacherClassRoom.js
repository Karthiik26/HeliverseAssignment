const {getDetailsTeacherFromToken} = require("../Helper/GetDetailsFromToken");

const GettingTeacherClassRoom = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const Teachers = await getDetailsTeacherFromToken(token);

    return res.status(200).json({
      message: "Geting All Teachers Succesfully",
      data: Teachers,
      success: true,
    });
     

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = GettingTeacherClassRoom;
