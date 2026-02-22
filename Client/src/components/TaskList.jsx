import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../contextApi/TaskContext";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);


  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
