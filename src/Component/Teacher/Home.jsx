import React, { useEffect, useState } from "react";
import TeacherNavBar from "./TeacherNavbar";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const BasePath = location.pathname;
  const TeacherToken = location.state;

  const [setTeacherDetails, setsetTeacherDetails] = useState({});

  const GetTeacherByToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}FullStack/GetTeacherClassRoom`,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        console.log(response?.data);
        setsetTeacherDetails(response?.data.data);
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
    GetTeacherByToken();
  }, [TeacherToken]);

  return (
    <>
      <section className={`bg-gray-100`}>
        <TeacherNavBar TeacherName={setTeacherDetails?.Name} />
      </section>
      <section className="flex justify-center items-center mt-10 flex-col">
        {BasePath === "/v18/TeacherDashBoard" ? (
          <>
          <div className="text-xl text-black font-mono font-bold" >
            <h1> Teacher Name : {setTeacherDetails?.Name}
            </h1>

            <h1> Teacher Email : {setTeacherDetails?.Email}
            </h1>
          </div>
            <div className="flex justify-center items-center flex-row gap-4 mt-20 font-serif font-bold text-center">
              <div className="w-80 h-32 rounded-lg border-2 border-black bg-green-200 flex justify-center items-center gap-4">
                <div>50 </div>

                <div>No Of Students In Your Class</div>
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
