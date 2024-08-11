import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState(true);
  const [TeacherData, setTeacherData] = useState({
    Email: "",
    Password: "",
  });

  const HandleShowPwd = () => {
    setPassword(!password);
  };

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setTeacherData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  const HandleTeacherLogin = async (e) => {
    e.preventDefault();
    console.log(TeacherData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/LoginTeacher`,
        {
          Email: TeacherData?.Email,
          Password: TeacherData?.Password,
        },
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
        localStorage.setItem("TeacherToken", response.data.token);
        nav("/v18/TeacherDashBoard", {
          state: response.data.token,
        });
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error)
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="mt-5 text-2xl font-sans font-bold text-center">
        Login Teacher
      </div>
      <form onSubmit={HandleTeacherLogin}>
        <div className="flex flex-col mt-4">
          <div className="flex flex-col">
            <label htmlFor="Email" className="my-1.5 text-lg">
              Email
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              required
              value={TeacherData?.Email}
              onChange={HandleInputElement}
              className="border-2 border-black rounded-sm py-1 pl-3 text-lg w-64"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="Password" className="my-1.5 text-lg">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={password ? "password" : "text"}
                name="Password"
                id="Password"
                required
                value={TeacherData?.Password}
                onChange={HandleInputElement}
                className="border-2 border-black rounded-sm py-1 pl-3 text-lg w-64"
              />
              <div className="-ml-8">
                {password ? (
                  <FaEye size={18} onClick={HandleShowPwd} />
                ) : (
                  <IoEyeOff size={18} onClick={HandleShowPwd} />
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              className="text-lg border-2 px-4 py-2 mt-8 rounded-md bg-yellow-300 text-black"
              type="submit"
            >
              Login Teacher
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
