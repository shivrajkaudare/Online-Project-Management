import React, { useState } from "react";
import axios from "axios";
import "./NewProject.css";

const NewProject = () => {
  const [projectData, setProjectData] = useState({
    theme: "",
    reason: "For Business",
    type: "Internal",
    division: "Filters",
    category: "Quality A",
    priority: "High",
    department: "Strategy",
    location: "Pune",
    startDate: "",
    endDate: "",
    status: "Registered",
  });

  const handleChange = (event) => {
    // const { name, value } = event.target;
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
  };

  const saveProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/addproject",
        projectData
      );

      if (response.status === 201) {
        // alert("Project saved successfully!");
        // Reset the form
        setProjectData({
          theme: "",
          reason: "For Business",
          type: "Internal",
          division: "Filters",
          category: "Quality A",
          priority: "High",
          department: "Strategy",
          location: "Pune",
          startDate: "",
          endDate: "",
          status: "Registered",
        });
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An error occurred while saving the project.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>
            <i className="fa-solid fa-chevron-left"></i> &nbsp; Create Project
          </h2>
          <img
            src="/src/assets/images/Logo.svg"
            alt="Logo"
            className="New-logo"
          />
        </div>
        <div className="From-container">
          <div className="conent-container">
            <div className="first-div">
              <div className="Input">
                <input
                  type="text"
                  placeholder="Enter Project Theme"
                  name="theme"
                  value={projectData.theme}
                  onChange={handleChange}
                />
              </div>
              <div className="saveProjectButton">
                <button onClick={saveProject}>Save Project</button>
              </div>
            </div>

            <div className="second-div">
              <div className="dropdown">
                <label>Reason</label>
                <div className="dropdown-div">
                  <select
                    name="reason"
                    value={projectData.reason}
                    onChange={handleChange}
                  >
                    <option>For Business</option>
                    <option>For Personal</option>
                    <option>For Office</option>
                    <option>For Shop</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Type</label>
                <div className="dropdown-div">
                  <select
                    name="type"
                    value={projectData.type}
                    onChange={handleChange}
                  >
                    <option>Internal</option>
                    <option>External</option>
                    <option>Global</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Division</label>
                <div className="dropdown-div">
                  <select
                    name="division"
                    value={projectData.division}
                    onChange={handleChange}
                  >
                    <option>Filters</option>
                    <option>Marketing</option>
                    <option>Netwoking</option>
                    <option>Distributing</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Category</label>
                <div className="dropdown-div">
                  <select
                    name="category"
                    value={projectData.category}
                    onChange={handleChange}
                  >
                    <option>Quality A+</option>
                    <option>Quality A</option>
                    <option>Quality B+</option>
                    <option>Quality B</option>
                    <option>Quality c</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Priority</label>
                <div className="dropdown-div">
                  <select
                    name="priority"
                    value={projectData.priority}
                    onChange={handleChange}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Department</label>
                <div className="dropdown-div">
                  <select
                    name="department"
                    value={projectData.department}
                    onChange={handleChange}
                  >
                    <option>STR</option>
                    <option>FIN</option>
                    <option>QLT</option>
                    <option>MAN</option>
                    <option>STO</option>
                    <option>HR</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Location</label>
                <div className="dropdown-div">
                  <select
                    name="location"
                    value={projectData.location}
                    onChange={handleChange}
                  >
                    <option>Pune</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Nagpur</option>
                    <option>bengluru</option>
                  </select>
                </div>
              </div>

              <div className="dropdown">
                <label>Start Date</label>
                <div className="dropdown-div">
                  <input
                    type="date"
                    name="startDate"
                    value={projectData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="dropdown">
                <label>End Date</label>
                <div className="dropdown-div">
                  <input
                    type="date"
                    name="endDate"
                    value={projectData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="status">
            <h4>
              <span>Status: </span> {projectData.status}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProject;
