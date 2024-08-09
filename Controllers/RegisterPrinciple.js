const Principle = require("../Models/PrincipleSchema");
const bcryptjs = require("bcryptjs");

const RegisterPrinciple = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    const Slat = await bcryptjs.genSalt(10);
    const HashPassword = await bcryptjs.hash(Password, Slat);

    const Payload = {
      Name,
      Email,
      Password: HashPassword,
    };

    const PrincipleSave = new Principle(Payload);
    const Save = await PrincipleSave.save();

    return res.status(201).json({
      message: "Principle Created Succesfully",
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


module.exports = RegisterPrinciple;
