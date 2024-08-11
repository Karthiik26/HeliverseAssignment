import React, { useEffect, useState } from "react";
import PrincipleNavbar from "./PrincipleNavbar";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {

  const [PrincipleName ,setPrincipleName] = useState()
  const [PrincipleEmail ,setPrincipleEmail] = useState()


  const location = useLocation();
  const BasePath = location.pathname;
  const PrincipeToken = location.state;
  
  const GetTeacherByToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}FullStack/GettingPrinciple`, {
          withCredentials: true,
        });
  
        if (response?.data?.success) {
          console.log(response?.data?.data);
          setPrincipleEmail(response?.data?.data?.Email)
          setPrincipleName(response?.data?.data?.Name)
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.message || "An error occurred. Please try again.");
      }
  }
  
  useEffect(()=>{
    GetTeacherByToken();
  }, [PrincipeToken])


  return (
    <>
      <div className="grid grid-cols-[280px,1fr] h-screen">
        <section className={`bg-gray-100 lg:block`}>
          <PrincipleNavbar />
        </section>

        <section className={``}>
          <section className=" top-0 bg-gray-100 py-2 justify-between flex items-center w-full h-16">
            <div className="mx-4 flex flex-row justify-center items-center ">
              
            </div>
          </section>

          <section className="flex justify-center items-center mt-10 flex-col" >

          {
            BasePath === '/v18/PrincipleDashBoard' ? (
              <>
              <div>
                {
                  PrincipleName && (
                    <div className="text-xl font-sans font-bold" >
                      <div>
                         Name :-  
                     { PrincipleName}
                      </div>
                      <div>

                       Email :-  
                     { PrincipleEmail}
                      </div>
                    </div>
                  )
                }

              </div>

<div className="flex justify-center items-center flex-row gap-4 mt-20 font-serif font-bold text-center" >

              <div className="w-72 h-32 rounded-lg border-2 border-black bg-red-300 flex justify-center items-center gap-4" >
                <div>50 </div> 
                
                <div>No Of Teachers</div>
              </div>
              
              <div className="w-72 h-32 rounded-lg border-2 border-black bg-green-200 flex justify-center items-center gap-4">
                <div>50 </div> 
                
                <div>No Of Students</div>
              </div>

              <div className="w-72 h-32 rounded-lg border-2 border-black bg-blue-200 flex justify-center items-center gap-4">
                <div>50 </div> 
                <div>No Of ClassRooms</div>
              </div>

              <div className="w-72 h-32 rounded-lg border-2 border-black bg-yellow-200 flex justify-center items-center gap-4">
                <div>50 </div> 
                <div>No Of Assigned Lectures</div>
              </div>
</div>

                </>
            ):(

              <Outlet />
            )
          }
          </section>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
