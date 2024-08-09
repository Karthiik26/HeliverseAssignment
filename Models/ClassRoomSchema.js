const mongoose = require("mongoose");

const ClassRoomSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Provide ClassRoom Name"],
      unique: true,
    },
    StartTime: {
      type: String,
      required: [true, "Provide Start Time"],
    },
    EndTime: {
      type: String,
      required: [true, "Provide End Time"],
    },
    Date: {
      type: String,
      required: [true, "Provide Date"],
    },
    Day: {
      type: String,
      required: [true, "Provide Day"],
    },
    TeacherId: [],
    Students: [],
  },
  {
    timestamps: true,
  }
);

const ClassRoom = mongoose.model("ClassRoom", ClassRoomSchema);

module.exports = ClassRoom;
