import { createContext, useEffect, useState } from "react";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setTasks(data);
  };

  const addTask = async (task) => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  const editTask = async (id, updatedTask) => {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    setTasks(tasks.map((task) => (task._id === id ? data : task)));
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, []);

  const value = {
    tasks, fetchTasks, addTask, deleteTask, editTask
    };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
