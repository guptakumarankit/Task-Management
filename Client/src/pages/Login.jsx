import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../API/apiFetch.js";
import toast , { Toaster } from "react-hot-toast";

const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      const authUser = JSON.parse(userAuth);
      if (authUser?.isLogin) {
        navigate("/task");
      }
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await userBaseUrl.post("/login", {
        email,
        password
      });
      // console.log(response?.isLogin)
      const data = response?.data;

      if(data?.success){
        const authData = {
          isLogin : true,
          token : data?.token
        }
        localStorage.setItem("userAuth" , JSON.stringify(authData));
        toast.success("Login SuccessFully!");
        setTimeout(() => navigate("/task") , 500);
      }
      else{
         toast.error(data?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data?.message || "Invalid credentials");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
    finally{
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl space-y-6">
        
        <h2 className="text-3xl font-bold text-center text-white">
          You Can Login here..
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition duration-300"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

   
        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm">Password</label>
          <input
            type="text"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition duration-300"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
     
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white 
                     font-semibold py-3 rounded-lg transition duration-300 
                     transform hover:scale-[1.02]"
        >
          Login
        </button>
    
        <p className="text-sm text-slate-400 text-center">
          Don’t have an account? 
          <Link to="/signUp" className="text-indigo-400 hover:text-indigo-300 cursor-pointer ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;