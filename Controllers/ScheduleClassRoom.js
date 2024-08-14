const ClassRoom = require("../Models/ClassRoomSchema");
const moment = require("moment"); // Make sure to import moment

const ScheduleClassRoom = async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, date, teacherId } = req.body;

  try {
    const classroom = await ClassRoom.findById(id).populate("Teacher");

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (classroom.Teacher._id.toString() !== teacherId) {
      return res
        .status(403)
        .json({ message: "Teacher does not belong to this classroom" });
    }

    const dayOfWeek = moment(date).format("dddd");

    const currentDate = moment().startOf("day");
    const scheduleDate = moment(date).startOf("day");

    if (scheduleDate.isBefore(currentDate)) {
      return res
        .status(400)
        .json({ message: "Cannot schedule for a past date", success: false });
    }

    const isDateRepeated = classroom.ClassRoomSchedule.some((schedule) =>
      moment(schedule.date, "YYYY-MM-DD").isSame(date, "day")
    );

    if (isDateRepeated) {
      return res
        .status(400)
        .json({ message: "Schedule for this date already exists" });
    }

    const scheduleEntry = {
      startTime,
      endTime,
      date: `${date} (${dayOfWeek})`,
    };

    classroom.ClassRoomSchedule.push(scheduleEntry);

    await classroom.save();

    res.status(200).json({
      message: "Schedule added successfully",
      data: classroom,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: true });
  }
};

module.exports = ScheduleClassRoom;
