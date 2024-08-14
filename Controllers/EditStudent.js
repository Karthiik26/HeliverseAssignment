const StudentSchema = require("../Models/StudentSchema");

const EditStudent = async (req, res) => {
  try {
    const { StudentId, Name, Rollno, Age, Email } = req.body;

    const CheckEmail = await StudentSchema.findOne({Email});
    if (CheckEmail) {
      return res
        .status(400)
        .json({
          message: "The EmailId Already Exist.",
        });
    }

    const UpdateStudent = await StudentSchema.updateOne(
      { _id: StudentId },
      {
        Name: Name,
        Rollno: Rollno,
        Age: Age
      }
    );

    const StudentInformation = await StudentSchema.findById(StudentId);

    if (UpdateStudent) {
      return res.status(200).json({
        message: "Student Updated Successfully",
        data: StudentInformation,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = EditStudent;
