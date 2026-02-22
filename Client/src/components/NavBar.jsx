import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between">
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
