import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {


  const [password, setPassword] = useState(true);
  const [PrincipleData, setPrincipleData] = useState({
    Email: "",
    Password: "",
  });

  const HandleShowPwd = () => {
    setPassword(!password);
  };

  const HandleInputElement = (e) => {
    const { name, value } = e.target;

    setPrincipleData((Preve) => {
      return {
        ...Preve,
        [name]: value,
      };
    });
  };

  const nav = useNavigate();

  const HandlePrincipleLogin = async (e) => {
    e.preventDefault();

    console.log(PrincipleData.Email);
    console.log(PrincipleData.Password);

    // const URL = `${import.meta.env.VITE_BACKEND_URL}`;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}FullStack/LoginPrinciple`, {
        Email: PrincipleData?.Email,
        Password: PrincipleData.Password,
      }, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("PrincipleToken", response.data.token);
        nav('/v18/PrincipleDashBoard', {
          state : response.data.token
        })
      } else {
        toast.error(response?.data?.success);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
      console.log(error.response);

      console.log(error.response?.data?.message || "An error occurred. Please try again.");
    }

  };



return (
<>
<div className='flex justify-center items-center mt-20 flex-col' >

      <div className="mt-5 text-2xl font-sans font-bold text-center ">Login Principle</div>
      <form onSubmit={HandlePrincipleLogin}>
        <div className="flex flex-col mt-4">
          <div className="flex flex-col ">
            <label htmlFor="Email" className="my-1.5 text-lg">
              Email
            </label>
            <input
              type="Email"
              name="Email"
              id="Email"
              required
              value={PrincipleData?.Email}
              onChange={HandleInputElement}
              className="border-2 border-black rounded-sm py-1 pl-3 text-lg w-64"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="Password" className="my-1.5 text-lg" >Password</label>
            <div className="flex items-center">
              <input
                type={password ? "password" : "text"}
                name="Password"
                id="Password"
                required
                value={PrincipleData?.Password}
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
              Login Principle
            </button>
          </div>
        </div>
      </form>
</div>

</>
  )
}

export default Login
