import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import axios from "axios";
import toast from "react-hot-toast";
import { GoTasklist } from "react-icons/go";

const PrincipleNavbar = () => {

  const nav = useNavigate();

  const HandleLogOut = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}FullStack/CommonLogOut`;
  
      const response = await axios.get(URL, {
        withCredentials: true, // Include this if your backend needs to handle cookies
      });
  
      if (response?.data?.success) {
        toast.success("Logout successful")
        localStorage.clear('PrincipleToken')
        nav("/v18/principleLogin");
      } else {
        console.error("Logout failed", response?.data?.message);
      }
    } catch (error) {
      console.error("An error occurred during logout", error.message || error);
    }
  };
  

  return (
    <>
      <div className="w-full h-full shadow-xl">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center flex-col gap-3 text-lg text-center font-sans font-semibold">
            {/* <div className="py-3 w-64 hover:font-bold isActive float-left  rounded-lg px-4 flex justify-evenly items-center text-black"> */}
            <div className="px-6 py-4 text-xl">Principle Dashboard</div>

            <div className=" mt-5 gap-5 flex flex-col ">
              <NavLink
                title="PrincipleDashBoard"
                to={"/v18/PrincipleDashBoard"}
                className="py-3 w-64 mx-3 hover:font-bold float-left text-white rounded-lg px-4 flex justify-evenly items-center bg-gray-500"
              >
                <RxDashboard size={28} />
                Dashboard
              </NavLink>

              <NavLink
                title="Add Student"
                to={"StudentArea"}
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex  justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <PiStudentBold size={28} />
                Add Student
              </NavLink>

              <NavLink
                title="Add Teacher"
                to={"TeacherArea"}
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <FaUsers size={28} />
                Add Teacher
              </NavLink>

              <NavLink
                title="Add ClassRoom"
                to={"ClassRoomArea"}
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <MdAssignmentAdd className="mx-3" size={28} />
                Add ClassRoom
              </NavLink>


              <NavLink
                title="Assign ClassRoom"
                to={"AssignClasssRoomToStudent"}
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <MdOutlineAssignmentTurnedIn className="mr-2" size={28} />
                Assign Student
              </NavLink>

              <NavLink
                title="Assign Lectures"
                to={"AssignLectureToTeacher"}
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <GoTasklist className="mr-2" size={28} />
                Assign Lecture
              </NavLink>
            </div>
          </div>
          <div className="flex justify-center flex-col m-5 items-center">
          <div
                className="py-3 w-64 mx-3 hover:font-bold isActive float-left hover:text-white rounded-lg px-8 flex justify-evenly items-center hover:bg-gray-500 text-black"
              >
                <button onClick={HandleLogOut} >
                <SlLogout size={28} />
                </button>
                LogOut
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrincipleNavbar;
