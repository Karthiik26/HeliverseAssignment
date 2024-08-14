import React, { useState } from "react";
import TeacherLogin from "./Teacher/Login";
import StudentLogin from "./Student/Login";
import { useNavigate } from "react-router-dom";

const Mainentry = () => {
  const [SelectLogin, setSelectLogin] = useState("Select One");

  const ChangeLogin = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const data = e.target.value;
    setSelectLogin(data);
  };

  const nav = useNavigate();

  console.log(SelectLogin);

  const toprincipal = () => {
    nav("/v18/PrincipleLogin");
  };

  return (
    <>
      <div className="flex justify-between mx-32 my-20">
        <div className="mr-32 text-7xl font-bold tracking-widest mt-28">Welcome To Our School</div>
        {/* <div className="flex justify-center items-center m-20"> */}
        <div className="flex flex-col justify-center items-center ml-32 text-xl">
          <div className="py-8">
            <button
              onClick={toprincipal}
              className="px-5 py-3 bg-red-400 text-white font-bold text-lg"
            >
              Principal
            </button>
          </div>
          <div>
            <label for="underline_select" class="sr-only">
              Underline select
            </label>
            <select
              id="underline_select"
              class=" py-2.5 px-0 w-52 text-md text-black bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-200 "
              onChange={ChangeLogin}
              value={SelectLogin}
            >
              <option className="text-black" selected value={"Select One"}>
                Select You Are
              </option>
              <option value={"Student"}>Student</option>
              <option value={"Teacher"}>Teacher</option>
            </select>
          </div>

          {SelectLogin === "Student" && <StudentLogin />}

          {SelectLogin === "Teacher" && <TeacherLogin />}

          {SelectLogin === "Select One" && (
            <div className="w-[256px] h-[328px] bg-red-200 m-10 rounded-lg text-center flex justify-center flex-col">
              <div>
                {" "}
                Hi" If You Are A Student <br /> Get Your Time Table
              </div>
              <div> OR</div>
              <div>
                If You Are A Teacher <br /> Check Your Task
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Mainentry;
