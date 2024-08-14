import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const YourClassMates = () => {
  const location = useLocation();

  const [setStudentDetails, setsetStudentDetails] = useState("");

  const [MainStudentDetails, setMainStudentDetails] = useState({});

  const GetStudentByToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetStudentsByClassRoom`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        console.log(response?.data?.data?._id);
        setsetStudentDetails(response?.data?.data?._id);
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

  const GetAllStudents = async () => {
    try {
      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }FullStack/GettingStudentLList/${setStudentDetails}`;

      const response = await axios.get(URL);

      if (response?.data?.success) {
        console.log(response?.data);
        setMainStudentDetails(response?.data?.data);
      } else {
        console.error("getting", response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred during logout", error.message || error);
    }
  };

  useEffect(() => {
    GetStudentByToken();
  }, []);

  useEffect(() => {
    GetAllStudents();
  }, [setStudentDetails]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center gap-10 mb-10">
          <div className="text-lg font-semibold">
            Your Class: {MainStudentDetails?.Name}
          </div>
          <div className="text-md font-medium ">
            Your Teacher: {MainStudentDetails?.Teacher?.Name}
          </div>
        </div>

        <div className="w-[900px] max-w-4xl overflow-x-auto">
          <div className="text-lg font-sans font-bold">Students</div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Roll No</th>
                <th className="py-2 px-4 text-left text-gray-600">Age</th>
              </tr>
            </thead>
            <tbody>
              {MainStudentDetails?.Students?.map((data, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{data?.Name}</td>
                  <td className="py-2 px-4">{data?.Rollno}</td>
                  <td className="py-2 px-4">{data?.Age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default YourClassMates;
