import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const TeacherAreaInsidePrinciple = () => {
  const [CreatTeacher, setCreatTeacher] = useState(false);

  const [CreateTeacherData, setCreateTeacherData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setCreateTeacherData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  const HandleCreateTeacher = async (e) => {
    e.preventDefault();

    console.log(CreateTeacherData);

    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/RegisterTeacher`,
        {
          Name: CreateTeacherData?.Name,
          Email: CreateTeacherData?.Email,
          Password: CreateTeacherData.Password,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        GetAllTeachers();
        console.log(response?.data);
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

  const [TeacherApiData, setTeacherApiData] = useState([]);

  const GetAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetAllTeachers`
      );

      if (response?.data?.success) {
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
  }, []);

  return (
    <>
      <div className="overflow-y-scroll overflow-auto scrollbar">
        <div className="flex justify-between w-full py-4 bg-yellow-200">
          <div className="mx-10">Total : {TeacherApiData.length}</div>
          <div className="text-right">
            <button
              onClick={() => setCreatTeacher(true)}
              className="bg-green-400 mx-14 text-md text-white px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Add Teacher
            </button>
          </div>
        </div>
        <div>
          <div className="py-8 font-bold">All Teachers</div>

          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-[1250px] text-sm text-left rtl:text-right">
              <thead className="text-md text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Sr No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teacher Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {TeacherApiData.map((data, index) => (
                  <tr key={index} className="text-sm">
                    <th className="px-5 py-4">{index + 1}</th>
                    <td className="px-6 py-4">{data?.Name}</td>
                    <td className="px-6 py-4">{data.Email}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <div>
                        <button>Edit</button>
                      </div>
                      <div>
                        <button>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {TeacherApiData.length === 0 && (
              <div className="m-20 p-20 text-center text-3xl text-red-700 font-extrabold tracking-wider">
                No Teacher Found !!! <br />
                Add Teacher
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Teacher */}
      {CreatTeacher && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[550px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setCreatTeacher(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={HandleCreateTeacher}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="TeacherName" className="text-lg font-bold">
                      Enter Teacher Name
                    </label>
                    <input
                      type="text"
                      value={CreateTeacherData?.Name}
                      onChange={HandleInputElement}
                      name="Name"
                      id="TeacherName"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="TeacherEmail" className="text-lg font-bold">
                      Enter Teacher Email
                    </label>
                    <input
                      type="email"
                      value={CreateTeacherData?.Email}
                      onChange={HandleInputElement}
                      name="Email"
                      id="TeacherEmail"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="TeacherPassword"
                      className="text-lg font-bold"
                    >
                      Create Teacher Password
                    </label>
                    <input
                      type="text"
                      value={CreateTeacherData?.Password}
                      onChange={HandleInputElement}
                      name="Password"
                      id="TeacherPassword"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  type="submit"
                  className={"bg-yellow-200 py-4 px-3 font-bold"}
                >
                  Create Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherAreaInsidePrinciple;
TeacherAreaInsidePrinciple;
