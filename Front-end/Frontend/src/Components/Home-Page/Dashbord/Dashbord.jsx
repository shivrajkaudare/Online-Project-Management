import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./Pages/BarChart";
import "./Dashbord.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  // fetch data from api
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/dashboard/stats"
        );
        console.log("Fetched data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []); // empty array because when page loads first time it loads data on webpage.

  const chartData = data
    ? {
        labels: ["Total Projects", "Closed", "Running", "Closure Delay"],
        datasets: [
          {
            label: "Projects",
            data: [
              data.totalProjects,
              data.closedProjects,
              data.runningProjects,
              data.closureDelayProjects,
            ],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      }
    : null;

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Dashboard</h2>
          <img
            src="/src/assets/images/Logo.svg"
            alt="Logo"
            className="login-logo"
          />
          <a href="logout">
            <img
              src="/src/assets/images/Logout.svg"
              alt="Logo"
              className="logout-img"
            />
          </a>
        </div>
        <div className="Container-body">
          <div className="cards-container">
            <div className="Cards">
              <div className="C-content">
                <h5>Total Projects</h5>
                <h1>{data ? data.totalProjects : 0}</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content ">
                <h5>Closed</h5>
                <h1>{data ? data.closedProjects : 0}</h1>
              </div>
            </div>
            <div className="Cards one">
              <div className="C-content">
                <h5>Running</h5>
                <h1>{data ? data.runningProjects : 0}</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Closure Delay</h5>
                <h1>{data ? data.closureDelayProjects : 0}</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Cancelled</h5>
                <h1>{data ? data.cancelledProjects : 0}</h1>
              </div>
            </div>
          </div>
          <div className="chart-Container">
            <h3>Department wise - Total VS Closed</h3>
            <div className="chart">
              {chartData && <BarChart data={chartData} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
