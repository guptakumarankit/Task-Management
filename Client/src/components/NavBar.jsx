import { useNavigate } from "react-router-dom";
import toast , {Toaster} from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    toast.success("Logout SuccessFully!");
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
      <Toaster position="top-center" />
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;