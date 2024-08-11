import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AssignLectureToTeacher = () => {
  const [AddLectures, setAddLectures] = useState(false);

  const [AssignLectureData, setAssignLectureData] = useState({
    ClassRoomId: "",
    TeacherName: "",
    LectureStratTime: "",
    LectureEndTime: "",
    Date: "",
    Subject: "",
  });

  const HandleInputIdChange = (e) => {
    const { name, value } = e.target;

    setAssignLectureData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setAssignLectureData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  const HandleAssignLecture = async (e) => {
    e.preventDefault();

    console.log(AssignLectureData);

    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BACKEND_URL}FullStack/LoginPrinciple`,
    //     {
    //       Email: PrincipleData?.Email,
    //       Password: PrincipleData.Password,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   if (response?.data?.success) {
    //     toast.success(response?.data?.message);
    //     localStorage.setItem("PrincipleToken", response.data.token);
    //     nav("/v18/PrincipleDashBoard", {
    //       state: response.data.token,
    //     });
    //   } else {
    //     toast.error(response?.data?.success);
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.message);
    //   console.log(
    //     error.response?.data?.message || "An error occurred. Please try again."
    //   );
    // }
  };

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
                    Lecture Start Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lectures End Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subject
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
                  <td className="px-6 py-4">50</td>
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
            <form onSubmit={HandleAssignLecture} >
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
                      onChange={HandleInputIdChange}
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    >
                      <option value="1">Select One</option>
                      <option value="2">Teacher1</option>
                      <option value="3">Teacher1</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="SelectTeacher"
                      className="text-lg font-bold"
                    >
                      Select Teacher
                    </label>
                    <input
                      type="text"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                      name="TeacherName"
                      value={AssignLectureData?.TeacherName}
                      onChange={HandleInputElement} 
                      id="SelectTeacher"
                      readOnly
                    />
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
                <button type="submit" className={"bg-yellow-200 py-4 px-3 font-bold"}>
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
