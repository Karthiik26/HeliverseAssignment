import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AssignClasssRoomToStudent = () => {
  // Getting All students
  const [StudentApiData, setStudentApiData] = useState([]);

  const GetAllStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetAllStudents`
      );

      if (response?.data?.success) {
        console.log(response?.data?.data);
        setStudentApiData(response?.data?.data);
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);

      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // GetALL classrooms
  const [gettingClassRoomSchema, setgettingClassRoomSchema] = useState([]);

  const GetALLClasssrooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetClassRooms`
      );

      if (response?.data?.success) {
        console.log("classrooms" + response?.data);
        setgettingClassRoomSchema(response?.data?.data);
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const [StudentDetails, setStudentDetails] = useState({
    Age: "",
    Rollno: "",
    Email: "",
  });

  const [AddLectures, setAddLectures] = useState(false);
  const [TeacherName, setTeacherName] = useState("");

  // Getting Teacher Values from class
  const [classroomid, setclassroomid] = useState("");

  const HandleClassRoomChange = (e) => {
    const { value } = e.target;
    setclassroomid(value);
    console.log(AssignStudentData?.ClassRoomId);
  };

  const getClassRoomById = async (classid) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }FullStack/GetClassRoomById/${classid}`
      );

      if (response?.data?.success) {
        console.log("GetClassRoomById" + response?.data);
        console.log(response?.data);
        setTeacherName(response?.data?.data?.Teacher?.Name);
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Getting Student Values From student
  const [Studentid, setStudentid] = useState("");

  const HandleStudentChange = (e) => {
    const { value } = e.target;
    setStudentid(value);
  };

  const getStudentById = async (Studentid) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }FullStack/GetStudentById/${Studentid}`
      );

      if (response?.data?.success) {
        console.log("GetStudentById" + response?.data);
        console.log(response?.data?.data);
        setStudentDetails({
          Age: response?.data?.data.Age,
          Rollno: response?.data?.data?.Rollno,
          Email: response?.data?.data?.Email,
        });
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  console.log("classid" + classroomid);
  console.log("Studentid" + Studentid);
  console.log(StudentDetails);

  useEffect(() => {
    GetALLClasssrooms();
    GetAllStudents();
  }, []);

  useEffect(() => {
    getClassRoomById(classroomid);
  }, [classroomid]);

  useEffect(() => {
    getStudentById(Studentid);
  }, [Studentid]);

  const [AssignStudentData, setAssignStudentData] = useState({
    Studenid: "",
    ClassRoomId: "",
    TeacherName: "",
    StudentAge: "",
    StudentRollNo: "",
    StudentEmail: "",
  });

  useEffect(() => {
    setAssignStudentData({
      Studentid: Studentid,
      ClassRoomId: classroomid,
      TeacherName: TeacherName,
      StudentAge: StudentDetails?.Age,
      StudentRollNo: StudentDetails?.Rollno,
      StudentEmail: StudentDetails?.Email,
    });
  }, [Studentid]);

  const HandleAssignStudent = async (e) => {
    e.preventDefault();

    // if (
    //   AssignStudentData?.Studenid !== "" &&
    //   AssignStudentData?.ClassRoomId !== ""
    // ) {
    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;
    console.log(AssignStudentData);
    console.log(AssignStudentData?.Studentid);
    console.log(AssignStudentData?.ClassRoomId);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }FullStack/AssignStudentInsideClassRoom`,
        {
          studentId: AssignStudentData?.Studentid,
          classroomId: AssignStudentData?.ClassRoomId,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
      } else {
        toast.error(response?.data?.message);
        console.log("2nd console" + response?.data);
        console.log(response?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error?.response);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
    // }
  };

  return (
    <>
      <div className="overflow-y-scroll overflow-auto scrollbar">
        <div className="flex justify-between w-full py-4 bg-purple-300">
          <div className="mx-10"></div>
          <div className="text-right flex ">
            <button
              onClick={() => setAddLectures(true)}
              className="bg-red-400 mx-14 text-md text-white px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Assign Student
            </button>
          </div>
        </div>
        <div>
          <div className="py-8 font-bold">All ClassRooms</div>

          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-[1250px] text-sm text-left rtl:text-right">
              <thead className="text-md text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Sr No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ClassRoom Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teacher Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Roll No
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <th className="px-5 py-4">1</th>
                  <td className="px-6 py-4">10/08/24 Sun</td>
                  <td className="px-6 py-4">Xth B</td>
                  <td className="px-6 py-4">12:00</td>
                  <td className="px-6 py-4">6:00</td>
                  <td className="px-6 py-4">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add ClassRoom To That Class */}
      {AddLectures && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[500px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setAddLectures(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={HandleAssignStudent}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ClassRoomId" className="text-lg font-bold">
                      Select ClassRoom
                    </label>
                    <select
                      name="ClassRoomId"
                      id="ClassRoomId"
                      onChange={HandleClassRoomChange}
                      value={AssignStudentData?.ClassRoomId}
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    >
                      <option value="1">Select One</option>
                      {gettingClassRoomSchema.map((data, index) => (
                        <option key={data?._id} value={data?._id}>
                          {data?.Name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="SelectTeacher"
                      className="text-lg font-bold"
                    >
                      Teacher
                    </label>
                    <input
                      type="text"
                      value={TeacherName}
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                      name="TeacherName"
                      id="SelectTeacher"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="SelectStudent"
                      className="text-lg font-bold"
                    >
                      Select Student
                    </label>
                    <select
                      name="Studenid"
                      onChange={HandleStudentChange}
                      value={AssignStudentData?.Studenid}
                      id="SelectStudent"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    >
                      <option value="4">Select One</option>
                      {StudentApiData.map((data) => (
                        <option key={data?._id} value={data._id}>
                          {data?.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="StudentAge" className="text-lg font-bold">
                      Student Age
                    </label>
                    <input
                      type="text"
                      value={StudentDetails?.Age}
                      readOnly
                      name="StudentAge"
                      id="StudentAge"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="StudentRollNo"
                      className="text-lg font-bold"
                    >
                      Student Roll No
                    </label>
                    <input
                      type="text"
                      value={StudentDetails?.Rollno}
                      readOnly
                      name="StudentRollNo"
                      id="StudentRollNo"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="StudentEmail" className="text-lg font-bold">
                      Student Email
                    </label>
                    <input
                      type="text"
                      value={StudentDetails?.Email}
                      readOnly
                      name="StudentEmail"
                      id="StudentEmail"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <button
                  type="submit"
                  className={
                    "bg-yellow-200 py-4 px-3 font-bold border border-black rounded-lg"
                  }
                >
                  Assign Student To Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignClasssRoomToStudent;

// Api Banana hai student ko add kar ne ke liye
