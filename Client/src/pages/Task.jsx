import React from "react";

const Task = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form className="w-full max-w-lg bg-slate-900 p-8 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Add New Task
        </h2>

        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-300"
          />
        </div>


        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Description</label>
          <textarea
            placeholder="Enter the description"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-300 resize-none"
            rows={4}
          />
        </div>

 
        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Category</label>
          <select
            className="px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-300"
          >
            <option value="">Choose category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-slate-300 text-sm mb-1">Status</label>
          <select
            className="px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition duration-300"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                     py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default Task;