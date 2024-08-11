import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const BasePath = location.pathname;
  const StudentToken = location.state;
  console.log(location);

  const [setStudentDetails, setsetStudentDetails] = useState({});

  const GetStudentByToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetStudentsByClassRoom`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        console.log(response?.data);
        setsetStudentDetails(response?.data.data);
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
    GetStudentByToken();
  }, [StudentToken]);

  return (
    <>
      <section className={`bg-gray-100 `}>
        <StudentNavbar data={setStudentDetails?.Name} />
      </section>

      <section className="flex justify-center items-center mt-10 flex-col">
        {BasePath === "/v18/StudentHome" ? (
          <>
            <div className="flex justify-center items-center flex-row gap-4 mt-20 font-serif font-bold text-center">
              <div>
                <h1>
                Welcome
                </h1>
                <h1>Your Name : {setStudentDetails?.Name}</h1>
                <h1>Your Roll No : {setStudentDetails?.Email}</h1>
                <h1>Your Roll No : {setStudentDetails?.Rollno}</h1>
                <h1>Your Age : {setStudentDetails?.Age}</h1>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </section>
    </>
  );
};

export default Home;
