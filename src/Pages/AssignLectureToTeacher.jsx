import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AssignLectureToTeacher = () => {
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

  useEffect(() => {
    GetALLClasssrooms();
  }, []);

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setAssignLectureData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const [AddLectures, setAddLectures] = useState(false);

  const [AssignLectureData, setAssignLectureData] = useState({
    ClassRoomId: "",
    LectureStratTime: "",
    LectureEndTime: "",
    Date: "",
    Subject: "",
  });

  const nav = useNavigate();

  const HandleAssignLecture = async (e) => {
    e.preventDefault();
    console.log(AssignLectureData);

    const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/AddLectureToSchedule`,
        {
          classroomId: AssignLectureData?.ClassRoomId,
          startTime: AssignLectureData?.LectureStratTime,
          endTime: AssignLectureData?.LectureEndTime,
          lectureDetails: AssignLectureData?.Subject,
          date: AssignLectureData?.Date,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
        GettingStudentsInsideClassRoom()
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

  const [SetStudentDataAfterSave, setSetStudentDataAfterSave] = useState([]);
  // Fetch data using an of all classrooms
  const GettingStudentsInsideClassRoom = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetClassRooms`
      );

      if (response?.data?.success) {
        console.log(response?.data);
        setSetStudentDataAfterSave(response?.data?.data);
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
  };

  useEffect(() => {
    GettingStudentsInsideClassRoom();
  }, []);

  return (
    <>
      <div className="overflow-y-scroll overflow-auto scrollbar">
        <div className="flex justify-between w-full py-4 bg-blue-800">
          <div className="mx-10"></div>
          <div className="text-right flex ">
            <button
              onClick={() => setAddLectures(true)}
              className="bg-pink-400 mx-14 text-md text-black px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Add Lecture
            </button>
          </div>
        </div>
        <div>
          <div className="py-8 font-bold">All ClassRooms</div>

          {SetStudentDataAfterSave.map((data, index) => (
            <div className=" overflow-x-auto shadow-lg sm:rounded-lg">
              <div className="text-md m-2 py-4 flex justify-center gap-4 text-gray-700 text-center uppercase bg-gray-50">
                <tr>
                  <th>Class Name : {data?.Name}</th>
                </tr>
                <tr>
                  <th>Teacher Name : {data?.Teacher?.Name} </th>
                </tr>
              </div>
              {data?.ClassRoomSchedule?.map((lecture, index) => (
                <>
                  <div className="text-md m-2 py-4 flex justify-center gap-4 text-gray-700 text-center uppercase bg-gray-50">
                    <tr>
                      <th>
                        ClassRoom Time : From {lecture?.startTime} - To{" "}
                        {lecture?.endTime}
                      </th>
                    </tr>
                    <tr>
                      <th>ClassRoom Date : {lecture?.date}</th>
                    </tr>
                  </div>
                  <table className="w-[1250px] text-sm text-left rtl:text-right">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-5 py-3">
                          Sr No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Start Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          End Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Subject
                        </th>
                      </tr>
                    </thead>
                    {lecture?.Lectures?.map((time, index) => (
                      <tbody>
                        <tr className="text-sm">
                          <th className="px-5 py-4">{index + 1}</th>
                          <td className="px-6 py-4">{time?.startTime}</td>
                          <td className="px-6 py-4">{time?.endTime}</td>
                          <td className="px-6 py-4">{time?.Subject}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Add ClassRoom To That Class */}
      {AddLectures && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[500px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setAddLectures(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={HandleAssignLecture}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="ClassName" className="text-lg font-bold">
                      Select Class Name
                    </label>
                    <select
                      name="ClassRoomId"
                      id="ClassName"
                      value={AssignLectureData?.ClassRoomId}
                      onChange={HandleInputElement}
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

                  <div className="flex flex-col gap-4">
                    <label htmlFor="StartTime" className="text-lg font-bold">
                      Lecture Start Time
                    </label>
                    <input
                      type="time"
                      name="LectureStratTime"
                      value={AssignLectureData?.LectureStratTime}
                      onChange={HandleInputElement}
                      id="Time"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="EndTime" className="text-lg font-bold">
                      Lecture End Time
                    </label>
                    <input
                      type="time"
                      name="LectureEndTime"
                      value={AssignLectureData?.LectureEndTime}
                      onChange={HandleInputElement}
                      id="EndTime"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="Date" className="text-lg font-bold">
                      Date
                    </label>
                    <input
                      type="date"
                      name="Date"
                      value={AssignLectureData?.Date}
                      onChange={HandleInputElement}
                      id="Date"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="Subject" className="text-lg font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="Subject"
                      value={AssignLectureData?.Subject}
                      onChange={HandleInputElement}
                      id="Subject"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <button
                  type="submit"
                  className={"bg-yellow-200 py-4 px-3 font-bold"}
                >
                  Assign Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignLectureToTeacher;
