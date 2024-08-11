const {getDetailsPrincipleFromToken} = require("../Helper/GetDetailsFromToken");

const GettingPrinciple = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const Principle = await getDetailsPrincipleFromToken(token);

    return res.status(200).json({
      message: "Geting Principle Succesfully",
      data: Principle,
      success: true,
    });

    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = GettingPrinciple;
