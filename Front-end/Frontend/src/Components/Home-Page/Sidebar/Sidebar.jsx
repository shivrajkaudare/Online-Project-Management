import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  // State to track the currently active icon
  const [activeIcon, setActiveIcon] = useState("");

  // Icon paths
  const iconPaths = {
    dashboard: {
      default: "/src/assets/images/Dashboard.svg",
      active: "/src/assets/images/Dashboard-active.svg",
    },
    allProjects: {
      default: "/src/assets/images/Project-list.svg",
      active: "/src/assets/images/Project-list-active.svg",
    },
    addProject: {
      default: "/src/assets/images/create-project.svg",
      active: "/src/assets/images/create-project-active.svg",
    },
    logout: {
      default: "/src/assets/images/Logout.svg",
      active: "/src/assets/images/Logout-active.svg",
    },
  };

  // Function to handle icon click and navigation
  const handleIconClick = (iconName, route) => {
    setActiveIcon(iconName); // Set the current icon as active
    navigate(route); // Navigate to the respective route
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sec1">
          <div
            className="logo1"
            onClick={() => handleIconClick("dashboard", "/dashboard")}
          >
            <img
              src={
                activeIcon === "dashboard"
                  ? iconPaths.dashboard.active
                  : iconPaths.dashboard.default
              }
              alt="Dashboard"
            />
          </div>

          <div
            className="logo2"
            onClick={() => handleIconClick("allProjects", "/allprojects")}
          >
            <img
              src={
                activeIcon === "allProjects"
                  ? iconPaths.allProjects.active
                  : iconPaths.allProjects.default
              }
              alt="Project List"
            />
          </div>
        </div>
        <div className="line"></div>
        <div className="sec2">
          <div
            className="logo1"
            onClick={() => handleIconClick("addProject", "/addproject")}
          >
            <img
              src={
                activeIcon === "addProject"
                  ? iconPaths.addProject.active
                  : iconPaths.addProject.default
              }
              alt="Create Project"
            />
          </div>

          <div
            className="logo2"
            onClick={() => handleIconClick("logout", "/logout")}
          >
            <img
              src={
                activeIcon === "logout"
                  ? iconPaths.logout.active
                  : iconPaths.logout.default
              }
              alt="Logout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
