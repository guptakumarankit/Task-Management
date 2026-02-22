import React, { useContext, useState } from "react";
import { TaskContext } from "../contextApi/TaskContext";


const TaskItem = ({ task }) => {
  const { deleteTask, editTask } = useContext(TaskContext);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);

  return (
    <div className="flex justify-between bg-white p-3 mt-2">
      {edit ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <h3>{task.title}</h3>
      )}

      <div>
        {edit ? (
          <button
            onClick={() => {
              editTask(task._id, { title });

              setEdit(false);
            }}
          >
            Save
          </button>
        ) : (
          <button onClick={() => setEdit(true)}>Edit</button>
        )}

        <button
          onClick={() => deleteTask(task._id)}
          className="ml-3 text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
