import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const StudentAreaInsidePrinciple = () => {
  const [CreatStudent, setCreatStudent] = useState(false);

  const [CreateStudentData, setCreateStudentData] = useState({
    Name: "",
    Email: "",
    RollNo: "",
    Age: "",
    Password: "",
  });

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setCreateStudentData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  const HandleCreateStudent = async (e) => {
    e.preventDefault();

    console.log(CreateStudentData);

    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/RegisterStudent`,
        {
          Name: CreateStudentData?.Name,
          Email: CreateStudentData?.Email,
          Password: CreateStudentData?.Password,
          Rollno: CreateStudentData?.RollNo,
          Age: CreateStudentData?.Age,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        console.log(response?.data);
        GetAllStudents();
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

  useEffect(() => {
    GetAllStudents();
  }, []);

  return (
    <>
      <div className="overflow-y-scroll overflow-auto scrollbar">
        <div className="flex justify-between w-full py-4 bg-red-100">
          <div className="mx-10">Total : {StudentApiData.length}</div>
          <div className="text-right">
            <button
              onClick={() => setCreatStudent(true)}
              className="bg-blue-400 mx-14 text-md text-white px-4 py-3 rounded flex gap-2 items-center"
            >
              {" "}
              <FaPlus /> Add Student
            </button>
          </div>
        </div>
        <div>
          <div className="py-8 font-bold">All Students</div>

          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-[1250px] text-sm text-left rtl:text-right">
              <thead className="text-md text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Sr No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Roll No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {StudentApiData.map((data, index) => (
                  <tr key={index} className="text-sm">
                    <th className="px-5 py-4">{index + 1}</th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {data?.Name}
                    </th>
                    <td className="px-6 py-4">{data?.Email}</td>
                    <td className="px-6 py-4">{data?.Rollno}</td>
                    <td className="px-6 py-4">{data?.Age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                {
                  StudentApiData.length === 0 &&(
                    <div className="m-20 p-20 text-center text-3xl text-blue-700 font-extrabold tracking-wider" >
                      No Students Found !!! <br />Add Students
                    </div>
                  )
                }
          </div>
        </div>
      </div>

      {/* Create Student */}
      {CreatStudent && (
        <div className="absolute inset-0 pt-36 bg-slate-50 opacity-90">
          <div className="relative w-[800px] h-[550px] bg-green-200 m-auto">
            <button className="m-4" onClick={() => setCreatStudent(false)}>
              <IoMdArrowRoundBack size={28} />
            </button>
            <form onSubmit={HandleCreateStudent}>
              <div className="flex justify-around flex-row items-center mx-20">
                {/* 1 */}
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="Name" className="text-lg font-bold">
                      Enter Student Name
                    </label>
                    <input
                      type="text"
                      value={CreateStudentData?.Name}
                      onChange={HandleInputElement}
                      name="Name"
                      id="Name"
                      className="border-2 border-black text-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="StuAge" className="text-lg font-bold">
                      Enter Student Age
                    </label>
                    <input
                      type="number"
                      value={CreateStudentData?.Age}
                      onChange={HandleInputElement}
                      name="Age"
                      id="StuAge"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="RollNo" className="text-lg font-bold">
                      Enter Student Roll
                    </label>
                    <input
                      type="number"
                      value={CreateStudentData?.RollNo}
                      onChange={HandleInputElement}
                      name="RollNo"
                      id="RollNo"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex flex-col gap-4">
                    <label htmlFor="StudentEmail" className="text-lg font-bold">
                      Enter Student Email
                    </label>
                    <input
                      type="email"
                      value={CreateStudentData?.Email}
                      onChange={HandleInputElement}
                      name="Email"
                      id="Email"
                      className="border-2 border-black rounded-md w-56 text-lg p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="StudentPassword"
                      className="text-lg font-bold"
                    >
                      Create Password
                    </label>
                    <input
                      type="text"
                      value={CreateStudentData?.Password}
                      onChange={HandleInputElement}
                      name="Password"
                      id="Password"
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
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentAreaInsidePrinciple;
