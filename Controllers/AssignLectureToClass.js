const Classroom = require("../Models/ClassRoomSchema");
const moment = require("moment");

const AddLectureToSchedule = async (req, res) => {
  try {
    const { classroomId, startTime, endTime, date, lectureDetails } = req.body;

    const convertDate = (gettingDate) => {
      return moment(gettingDate, "YYYY-MM-DD").format("YYYY-MM-DD (dddd)");
    };

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (end <= start) {
      return res
        .status(400)
        .json({ message: "End time must be after start time." });
    }

    const classroom = await Classroom.findOne({ _id: classroomId });

    if (classroom) {
      const formattedDate = convertDate(date);
      const schedule = classroom.ClassRoomSchedule.find(
        (s) => s.date === formattedDate
      );

      if (schedule) {
        const overlappingLecture = schedule.Lectures.some((lecture) => {
          const lectureStart = new Date(`1970-01-01T${lecture.startTime}:00`);
          const lectureEnd = new Date(`1970-01-01T${lecture.endTime}:00`);
          return start < lectureEnd && end > lectureStart;
        });

        if (overlappingLecture) {
          return res.status(400).json({
            message: "The lecture overlaps with an existing lecture.",
          });
        }

        const updateResult = await Classroom.updateOne(
          { _id: classroomId, "ClassRoomSchedule.date": formattedDate },
          {
            $push: {
              "ClassRoomSchedule.$.Lectures": {
                Subject: lectureDetails,
                startTime,
                endTime,
              },
            },
          }
        );

        if (updateResult.matchedCount > 0) {
          res.status(200).json({
            message: "Lecture added successfully.",
            success: true,
            data: updateResult,
          });
        } else {
          res
            .status(400)
            .json({ message: "Failed to update schedule.", success: false });
        }
      } else {
        res.status(400).json({
          message: "No schedule found for the specified date.",
          success: false,
        });
      }
    } else {
      res.status(400).json({ message: "Classroom not found.", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error, error: true });
  }
};

module.exports = AddLectureToSchedule;
