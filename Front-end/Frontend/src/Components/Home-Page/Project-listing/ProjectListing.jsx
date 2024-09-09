import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectListing.css";

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Display 10 items per page

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Filtered and sorted projects based on searchText and sortColumn
  const getFilteredAndSortedProjects = () => {
    let filteredProjects = projects.filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (sortColumn) {
      filteredProjects.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
      });
    }

    return filteredProjects;
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/project/${id}/status`,
        { status }
      );
      if (response.status === 200) {
        fetchProjects(); // Refresh the project list after updating status
      }
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredAndSortedProjects = getFilteredAndSortedProjects();
  const paginatedProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  // it get the date in the format DD/MM/YY.
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>
            <i className="fa-solid fa-chevron-left"></i> &nbsp; Project Listing
          </h2>
          <a href="logout">
            <img
              src="/src/assets/images/Logout.svg"
              alt="Logo"
              className="logout-img"
            />
          </a>
        </div>
        <div className="add-container">
          <div className="controls">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-bar"
            />
            <div className="sort-dropdown">
              <label> Sort By :</label>
              <select
                value={sortColumn}
                onChange={(e) => setSortColumn(e.target.value)}
              >
                <option value="theme">Priority</option>
                <option value="reason">Reason</option>
                <option value="type">Type</option>
                <option value="division">Division</option>
                <option value="category">Category</option>
                <option value="priority">Priority</option>
                <option value="department">Dept.</option>
                <option value="location">Location</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
          <table className="project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Division</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Dept.</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <span className="project-theme">{project.theme} </span>
                    <br />
                    <span className="date">
                      {formatDate(project.startDate)}-
                      {formatDate(project.startDate)}
                    </span>
                  </td>
                  <td className="project-data">{project.reason}</td>
                  <td className="project-data">{project.type}</td>
                  <td className="project-data">{project.division}</td>
                  <td className="project-data">{project.category}</td>
                  <td className="project-data">{project.priority}</td>
                  <td className="project-data">{project.department}</td>
                  <td className="project-data">{project.location}</td>
                  <td className="project-data">{project.status}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn start"
                      onClick={() => updateStatus(project._id, "Running")}
                    >
                      Start
                    </button>
                    <button
                      className="action-btn close"
                      onClick={() => updateStatus(project._id, "Closed")}
                    >
                      Close
                    </button>
                    <button
                      className="action-btn cancel"
                      onClick={() => updateStatus(project._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/******************* Card Layout for Smaller Screens *********************/}
          <div className="project-cards">
            {paginatedProjects.map((project) => (
              <div className="project-card" key={project._id}>
                <div className="card-header">
                  <span className="project-theme">{project.theme} </span>
                  <span className="date">
                    {formatDate(project.startDate)} -
                    {formatDate(project.endDate)}
                  </span>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Reason:</strong> {project.reason}
                  </p>
                  <p>
                    <strong>Type:</strong> {project.type}
                  </p>
                  <p>
                    <strong>Division:</strong> {project.division}
                  </p>
                  <p>
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p>
                    <strong>Priority:</strong> {project.priority}
                  </p>
                  <p>
                    <strong>Dept.:</strong> {project.department}
                  </p>
                  <p>
                    <strong>Location:</strong> {project.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {project.status}
                  </p>
                </div>
                <div className="action-buttons">
                  <button
                    className="action-btn start"
                    onClick={() => updateStatus(project._id, "Running")}
                  >
                    Start
                  </button>
                  <button
                    className="action-btn close"
                    onClick={() => updateStatus(project._id, "Closed")}
                  >
                    Close
                  </button>
                  <button
                    className="action-btn cancel"
                    onClick={() => updateStatus(project._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectListing;
