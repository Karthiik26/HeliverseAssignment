import React from "react";
import { NavLink , useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-hot-toast'


const StudentNavbar = ({ data }) => {

    const nav = useNavigate();
    
  const HandleLogOut = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}FullStack/CommonLogOut`;

      const response = await axios.get(URL, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success("Logout successful");
        localStorage.clear("StudentToken");
        nav("/");
      } else {
        console.error("Logout failed", response?.data?.message);
      }
    } catch (error) {
      console.error("An error occurred during logout", error.message || error);
    }
  };

  return (
    <>
      <nav class="bg-gray-200 border-gray-200">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span class="self-center text-2xl font-semibold whitespace-nowrap">
              ABC SCHOOL
            </span>
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <div class="text-xl  text-gray-600 ">Welcome {data}</div>
            <div class="text-xl text-black px-3 rounded-lg bg-yellow-500 py-2 font-bold hover:underline">
              Student Space
            </div>
          </div>
        </div>
      </nav>
      <nav class="bg-gray-300 items-center">
        <div class="max-w-screen-xl px-4 py-3 mx-auto flex justify-between">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-md">
              <li>
                <NavLink
                  to={"/v18/StudentHome"}
                  class="text-gray-900   hover:underline"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/v18/StudentHome/YourClassMates"} class="text-gray-900   hover:underline">
                  Your ClassMates
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <button
              className="px-4 py-2 border border-black rounded-lg bg-red-400 text-black font-bold text-md"
              onClick={HandleLogOut}
            >
              LogOut
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default StudentNavbar;
