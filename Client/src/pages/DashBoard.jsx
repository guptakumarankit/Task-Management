import AddTask from "../components/AddTask";
import Navbar from "../components/NavBar";
import TaskList from "../components/TaskList";

const DashBoard = () => {
  return (
    <div>
      <Navbar/>
      <div className="p-5">
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
};

export default DashBoard;
