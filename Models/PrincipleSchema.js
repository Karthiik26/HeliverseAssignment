const mongoose = require("mongoose");

const PrincipleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Provide Principle Name"],
      unique: true,
    },
    Email: {
      type: Email,
      required: [true, "Provide Principle Email"],
      unique: true,
    },
    Password: {
        type : String,
        required : [true, "Provide Password"]
    },
  },
  {
    timestamps: true,
  }
);

const Principle = mongoose.model("Principle", PrincipleSchema);

module.exports = Principle;
