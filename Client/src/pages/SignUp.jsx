import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData , setFormData] = useState({
    fullName : "",
    email : "",
    password : ""
  })

  const handleSubmit = () => {
    e.preventDefault();
    setFormData({
      fullName : "",
      email : "",
      password : ""
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl space-y-6">
        
        <h2 className="text-3xl font-bold text-center text-white">
          Create Account 
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition duration-300"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData , fullName : e.target.value})}
         />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition duration-300"
            value={formData.email}
            onChange={(e) => setFormData({...formData , email : e.target.value})}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-slate-300 text-sm">Password</label>
          <input
            type="password"
            placeholder="Create password"
            className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition duration-300"
          value={formData.password}
          onChange={(e) => setFormData({...formData , password : e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white 
                     font-semibold py-3 rounded-lg transition duration-300 
                     transform hover:scale-[1.02]"
        >
          Sign Up
        </button>

        <p className="text-sm text-slate-400 text-center">
          Already have an account? 
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 cursor-pointer ml-1">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;