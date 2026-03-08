import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { taskBaseUrl } from "../API/apiFetch.js";
import toast, { Toaster } from "react-hot-toast";

const Task = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
  });
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getAllTaskList = async () => {
    try {
      const { data } = await taskBaseUrl.get("/fetchTask");
      setTasks(data?.task || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    getAllTaskList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (editId) {
        const response = await taskBaseUrl.put(`/updateTask/${editId}`, formData);
        if (!response) {
          toast.error("Something went wrong!");
        } else {
          setEditId(null);
          toast.success("Task updated successfully");
        }
      } else {
        const response = await taskBaseUrl.post("/addTask", formData);
        if (!response) {
          toast.error("Something went wrong!");
        } else {
          toast.success("Task added successfully");
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      getAllTaskList();
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await taskBaseUrl.delete(`/deleteTask/${id}`);
      if (response) {
        toast.success("Delete task successfully!");
        getAllTaskList();
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      category: task.category || "",
      status: task.status || "",    
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 space-y-10">
      <Toaster />
      <Navbar />

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-slate-900 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            {editId ? "Edit Task" : "Add New Task"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500"
               required
         />

          <textarea
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500"
            required
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700"
          >
            <option value="">Choose category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {editId ? "Update Task" : "Submit Task"}
          </button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl text-white font-semibold mb-4">Task List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id} className="border-b border-slate-800 hover:bg-slate-800">
                    <td className="px-4 py-3">{task.title}</td>
                    <td className="px-4 py-3">{task.description}</td>
                    <td className="px-4 py-3">{task.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">
                    No Tasks Added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;