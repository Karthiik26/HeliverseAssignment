const mongoose = require("mongoose");

const ClassRoomSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Provide ClassRoom Name"],
    unique: true,
  },
  StartTime: {
    type: Date,
    required: [true, "Provide Start Time"],
  },
  EndTime: {
    type: Date,
    required: [true, "Provide End Time"],
  },
  Date: {
    type: Date,
    required: [true, "Provide Date"],
    unique: true,
  },
  Day: {
    type: String,
    required: [true, "Provide Day"],
  },
  Teacher: {
    type: String,
    required: [true, "Provide Teacher Id"],
    unique: true,
  },
  Students: [],
}, {
    timestamps : true
});

const ClassRoom = mongoose.model("ClassRoom", ClassRoomSchema);

module.exports = ClassRoom;
