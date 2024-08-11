const mongoose = require("mongoose");

const Lectures = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  }
});

const ScheduleSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  Lectures : [Lectures]
});

const ClassRoomSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Provide ClassRoom Name"],
      unique: true,
    },
    ClassRoomSchedule: [ScheduleSchema],
    Teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    Students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClassRoom = mongoose.model("ClassRoom", ClassRoomSchema);

module.exports = ClassRoom;
