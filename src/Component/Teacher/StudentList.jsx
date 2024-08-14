import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const StudentList = () => {
  const location = useLocation();
  const TeacherToken = location.state;

  const [AddLectures, setAddLectures] = useState(false);
  const [setTeacherDetails, setsetTeacherDetails] = useState({});

  const GetTeacherByToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetTeacherClassRoom`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        console.log(response?.data?.data);
        setsetTeacherDetails(response?.data?.data);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    GetTeacherByToken();
  }, [TeacherToken]);

  const [HandlingAllDataOfTeacher, setHandlingAllDataOfTeacher] = useState([]);

  const GettingStudentList = async () => {
    try {
      if (!setTeacherDetails?._id) retun;

      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }FullStack/getClassRoomByTeacherId/${setTeacherDetails?._id.toString()}`;

      const response = await axios.get(URL);

      if (response?.data?.success) {
        console.log(response?.data);
        setHandlingAllDataOfTeacher(response?.data?.data);
      } else {
        console.error("Logout failed", response?.data?.message);
      }
    } catch (error) {
      console.error("An error occurred during logout", error.message || error);
    }
  };

  useEffect(() => {
    if (setTeacherDetails?._id) {
      GettingStudentList();
    }
  }, [setTeacherDetails?._id]);

  //   { StudentId, Name, Rollno, Age }
  const [StudentUpdateData, setStudentUpdateData] = useState({
    StudentName: "",
    StudentRollno: "",
    StudentAge: "",
    StudentEmail : ""
  });

  const [StudentId, setStudentId] = useState("");

  const HandleInputData = (e) => {
    const { name, value } = e.target;

    setStudentUpdateData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const HandleUpdateApi = async (dataId) => {
    console.log(dataId);
    setStudentId(dataId);
    setAddLectures(true);
    try {
      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }FullStack/GetStudentById/${dataId}`;

      const response = await axios.get(URL);

      if (response?.data?.success) {
        console.log(response?.data);
        setStudentUpdateData({
          StudentName: response?.data?.data?.Name,
          StudentRollno: response?.data?.data?.Rollno,
          StudentAge: response?.data?.data?.Age,
          StudentEmail: response?.data?.data?.Email,
        });
      } else {
        console.error("Update", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred during logout", error.message || error);
    }
  };

  const UpdateStudentData = async (e) => {
    e.preventDefault();
    console.log(StudentUpdateData);
    console.log(StudentId);

    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}FullStack/EditStudent`;

      const response = await axios.put(URL, {
        StudentId: StudentId,
        Name: StudentUpdateData?.StudentName,
        Rollno: StudentUpdateData?.StudentRollno,
        Age: StudentUpdateData?.StudentAge,
        Email: StudentUpdateData?.Email,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
        GettingStudentList();
      } else {
        console.error("Update", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred during logout", error.message || error);
    }
  };

  const HandleDeleteApi = async (StudentID) => {
    try {
      if (!setTeacherDetails?._id) retun;

      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }FullStack/DeleteStudent/${StudentID}`;

      const response = await axios.delete(URL);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
        GettingStudentList();
      } else {
        console.error("Delete", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred during logout", error.message || error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="text-center text-2xl font-bold">Student Details</div>
        <div class=" overflow-x-auto">
          <table class=" w-[1200px] text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sr No
                </th>
                <th scope="col" class="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Roll No
                </th>
                <th scope="col" class="px-6 py-3">
                  Age
                </th>
                <th scope="col" class="px-6 py-3">
                  Email Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {HandlingAllDataOfTeacher[0]?.Students?.map((data, index) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.Name}
                  </th>
                  <td class="px-6 py-4">{data?.Rollno}</td>
                  <td class="px-6 py-4">{data?.Email}</td>
                  <td class="px-6 py-4">{data?.Age}</td>
                  <td class="px-6 py-4 flex">
                    <div className="flex justify-center gap-4 ">
                      <span>
                        <button onClick={() => HandleUpdateApi(data?._id)}>
                          Edit
                        </button>
                      </span>
                      <span>
                        <button onClick={() => HandleDeleteApi(data?._id)}>
                          Delete
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {AddLectures && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[600px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setAddLectures(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={UpdateStudentData}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="StudentName">Student Name</label>
                    <input
                      type="text"
                      name="StudentName"
                      id="StudentName"
                      className="p-3 text-md"
                      value={StudentUpdateData?.StudentName}
                      onChange={HandleInputData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="StudentAge">Student Age</label>
                    <input
                      type="number"
                      name="StudentAge"
                      id="StudentAge"
                      value={StudentUpdateData?.StudentAge}
                      onChange={HandleInputData}
                      className="p-3 text-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="StudentRollno">Student Roll NO</label>
                    <input
                      type="number"
                      name="StudentRollno"
                      id="StudentRollno"
                      className="p-3 text-md"
                      value={StudentUpdateData?.StudentRollno}
                      onChange={HandleInputData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="StudentRollno">Student Email</label>
                    <input
                      type="email"
                      name="StudentEmail"
                      id="StudentEmail"
                      className="p-3 text-md"
                      value={StudentUpdateData?.StudentEmail}
                      onChange={HandleInputData}
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

export default StudentList;
