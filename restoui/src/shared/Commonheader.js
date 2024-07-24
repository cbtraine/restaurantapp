import React, { useState, useRef, useEffect } from "react";
import UserSettings from "../Components/userSetting";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const CommonHeader = () => {
  const [showUserSettings, setShowUserSettings] = useState(false);
  const userSettingsRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userSettingsRef.current &&
        !userSettingsRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setShowUserSettings(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleUserSettings = () => {
    setShowUserSettings((prev) => !prev);
  };

  return (
    <div className="bg-transparent text-white p-6 flex justify-between items-center relative">
      <div className="absolute  top-0 right-0 mt-1 mr-2">
        <AccountCircleSharpIcon
          className="cursor-pointer"
          onClick={toggleUserSettings}
          style={{ fontSize: 50, color: "yellow" }}
          ref={iconRef}
        />
        {showUserSettings && (
          <div className="absolute right-0 mt-2" ref={userSettingsRef}>
            <UserSettings />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonHeader;
