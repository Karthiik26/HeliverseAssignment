const PrincipleSchema = require("../Models/PrincipleSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginTeacher = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const Principle = await PrincipleSchema.findOne({ Email });

    if (!Principle) {
      return res.status(404).json({
        message: "Teacher not found. Please check your email.",
        error: true,
      });
    }

    const verifyPassword = await bcryptjs.compare(Password, Principle.Password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Invalid password. Please try again.",
        error: true,
      });
    }

    const tokenData = {
      id: Principle._id,
      Email: Principle.Email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Cookie options for proper handling in production
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
        error: true,
      });
    }

    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
    });
  }
};

module.exports = LoginTeacher;
