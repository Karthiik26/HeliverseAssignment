import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-hot-toast";

const ClassRoomAreaInsidePrinciple = () => {
  const [ClassName, setClassName] = useState(false);
  const [ClassRoom, setClassRoom] = useState(false);

  const [CreateNames, setCreateNames] = useState({
    ClassRoomName: "",
    TeacherName: "",
  });

  const [CreateClassRoomData, setCreateClassRoomData] = useState({
    ClassRoomName: "",
    TeacherName: "",
    StartTime: "",
    EndTime: "",
    Date: "",
  });

  // Onchange event
  const HandleInputElementForClassRoomCreating = (e) => {
    const { name, value } = e.target;
    setCreateNames((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  // on change event
  const HandleInputElementForAddingClassRoom = (e) => {
    const { name, value } = e.target;

    setCreateClassRoomData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  // getting all teacher
  const [TeacherApiData, setTeacherApiData] = useState([]);

  const GetAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetAllTeachers`
      );

      if (response?.data?.success) {
        console.log("teacher");
        console.log(response?.data?.data);
        setTeacherApiData(response?.data?.data);
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

  useEffect(() => {
    GetAllTeachers();
    GetAllClassRooms();
    GetALLClasssrooms();
  }, []);

  // getting all students
  const [ClassRoomApiData, setClassRoomApiData] = useState([]);
  const GetAllClassRooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetClassRooms`
      );

      if (response?.data?.success) {
        console.log("ClassRoomApiData");
        console.log(response?.data?.data);
        setClassRoomApiData(response?.data?.data);
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

  // Creating classname and teacher name
  const HandleCreateClassRoomName = async (e) => {
    e.preventDefault();

    console.log(CreateNames);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/CreateClassRoom`,
        {
          ClassRoomName: CreateNames?.ClassRoomName,
          TeacherName: CreateNames?.TeacherName?.toString(),
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
      } else {
        toast.error(response?.data?.message); // Use the correct message in case of an error
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error in API call:", error);
      console.error("Error details:", error.response?.data);
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // scheduling class to class room
  const HandleAddClassRoom = async (e) => {
    e.preventDefault();

    console.log(CreateClassRoomData);
    console.log("ClassRoomName" + CreateClassRoomData?.ClassRoomName);

    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/ScheduleClassRoom/${
          CreateClassRoomData?.ClassRoomName
        }`,
        {
          startTime: CreateClassRoomData?.StartTime,
          endTime: CreateClassRoomData?.EndTime,
          date: CreateClassRoomData?.Date,
          teacherId: CreateClassRoomData?.TeacherName,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
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

  // GetALL classrooms
  const [gettingClassRoomSchema, setgettingClassRoomSchema] = useState([]);

  const GetALLClasssrooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetClassRooms`
      );

      if (response?.data?.success) {
        console.log(response?.data);
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

  return (
    <>
      <div className="overflow-y-scroll overflow-auto scrollbar">
        <div className="flex justify-between w-full py-4 bg-purple-300">
          <div className="mx-10">Total : 50</div>
          <div className="text-right flex ">
            <button
              onClick={() => setClassName(true)}
              className="bg-red-400 text-md text-white px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Create Class Name
            </button>
            <button
              onClick={() => setClassRoom(true)}
              className="bg-red-400 mx-14 text-md text-white px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Add ClassRooms
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
                    ClassRoom Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teacher Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Students
                  </th>
                </tr>
              </thead>
              <tbody>
                {gettingClassRoomSchema.map((data, index) => (
                  <React.Fragment key={data?._id}>
                    {data?.ClassRoomSchedule.map((schedule, idx) => (
                      <tr key={idx} className="text-lg">
                        {idx === 0 && (
                          <>
                            <th
                              className="px-5 py-4"
                              rowSpan={data?.ClassRoomSchedule.length}
                            >
                              {index + 1}
                            </th>
                            <td
                              className="px-6 py-4"
                              rowSpan={data?.ClassRoomSchedule.length}
                            >
                              {data?.Name}
                            </td>
                            <td
                              className="px-6 py-4"
                              rowSpan={data?.ClassRoomSchedule.length}
                            >
                              {data?.Teacher?.Name}
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 flex gap-3 font-bold">
                          {/* <div className=" font-bold" >{idx+1} - </div> */}
                          <div>{schedule?.date}</div>
                        </td>
                        <td className="px-6 py-4">{schedule?.startTime}</td>
                        <td className="px-6 py-4">{schedule?.endTime}</td>
                        {idx === 0 && (
                          <td
                            className="px-6 py-4"
                            rowSpan={data?.ClassRoomSchedule.length}
                          >
                            {data?.Students?.length}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Classname And Assign Teacher */}
      {ClassName && (
        <div className="absolute inset-0 pt-44 bg-slate-50 opacity-90">
          <div className="relative w-[600px] h-[420px] bg-red-200 m-auto">
            <button className="m-4" onClick={() => setClassName(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <div className="flex justify-center items-center">
              <form onSubmit={HandleCreateClassRoomName}>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="ClassName"
                    className="text-xl font-sans font-bold"
                  >
                    Provide Unique Class Name
                  </label>
                  <input
                    type="text"
                    value={CreateNames?.ClassRoomName}
                    onChange={HandleInputElementForClassRoomCreating}
                    name="ClassRoomName"
                    id="ClassName"
                    className="border-2 border-black rounded-md text-xl px-2 py-3"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <label
                    htmlFor="AssignTeacher"
                    className="text-xl font-sans font-bold"
                  >
                    Assign Teacher To This Class
                  </label>
                  <select
                    name="TeacherName"
                    value={CreateNames?.TeacherName}
                    onChange={HandleInputElementForClassRoomCreating}
                    id="AssignTeacher"
                    className="border-2 border-black rounded-md text-xl px-2 py-3"
                  >
                    <option value="1">Select One</option>
                    {TeacherApiData.map((data) => (
                      <option key={data?._id} value={data?._id}>
                        {data?.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <button
                    type="submit"
                    className="text-xl p-3 bg-blue-400 font-sans font-bold text-white"
                  >
                    Create ClassRoom And Assign Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add ClassRoom To That Class */}
      {ClassRoom && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[500px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setClassRoom(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={HandleAddClassRoom}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="ClassName" className="text-lg font-bold">
                      Select Class Name
                    </label>
                    <select
                      name="ClassRoomName"
                      id="ClassName"
                      value={CreateClassRoomData?.ClassRoomName}
                      onChange={HandleInputElementForAddingClassRoom}
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    >
                      <option value="1">Select One</option>
                      {ClassRoomApiData.map((data) => (
                        <option key={data?._id} value={data?._id}>
                          {data?.Name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="TeacherName" className="text-lg font-bold">
                      Select Teacher
                    </label>
                    <select
                      name="TeacherName"
                      value={CreateClassRoomData?.TeacherName}
                      onChange={HandleInputElementForAddingClassRoom}
                      id="TeacherName"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    >
                      <option value="1">Select One</option>
                      {TeacherApiData.map((data) => (
                        <option key={data?._id} value={data?._id}>
                          {data?.Name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="StartTime" className="text-lg font-bold">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="StartTime"
                      value={CreateClassRoomData?.StartTime}
                      onChange={HandleInputElementForAddingClassRoom}
                      id="Time"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="EndTime" className="text-lg font-bold">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="EndTime"
                      value={CreateClassRoomData?.EndTime}
                      onChange={HandleInputElementForAddingClassRoom}
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
                      value={CreateClassRoomData?.Date}
                      onChange={HandleInputElementForAddingClassRoom}
                      id="Date"
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
                  Create Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassRoomAreaInsidePrinciple;
