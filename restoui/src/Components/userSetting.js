import React from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = () => {
  toast.success("Logout successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const UserSettings = () => {
  const navigate = useNavigate();

  // const userData = useSelector((state) => state.user.details);

  // console.log("user data from redux =>", userData);

  let userData = localStorage.getItem("userdetails");
  userData = JSON.parse(userData);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userdetails");
      localStorage.removeItem("role");
      navigate("/login");
      notifySuccess();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-48 mx-auto flex flex-col items-center backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200">
      <div className="relative">
        <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center mb-4 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200">
          <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-md backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200">
            <span className="text-white text-6xl font-bold">
              {userData?.username?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <p className="text-white text-lg font-semibold">{userData?.username}</p>
        <p className="text-white text-sm">{userData?.email}</p>
      </div>
      <Button variant="contained" onClick={handleLogout} color="error">
        Logout
      </Button>
    </div>
  );
};

export default UserSettings;
