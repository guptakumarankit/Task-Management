import React, { useState, useContext } from "react";
import { TaskContext } from "../contextApi/TaskContext";


const AddTask = () => {
  const { addTask } = useContext(TaskContext);


  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="border p-2 flex-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4">Add</button>
    </form>
  );
};

export default AddTask;
