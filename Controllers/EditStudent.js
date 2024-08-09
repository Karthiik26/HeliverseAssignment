const StudentSchema = require("../Models/StudentSchema");

const EditStudent = async (req, res) => {
  try {
    const { StudentId, Name, Rollno, Age, Password } = req.body;

    const UpdateStudent = await StudentSchema.updateOne(
      { _id: StudentId },
      {
        Name: Name,
        Rollno: Rollno,
        Age: Age,
        Password: Password,
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
