import React from "react";
import "./Dashbord.css";
import BarChart from "./Pages/BarChart";

const Dashboard = () => {
  const data = {
    labels: ["STR", "FIN", "QLT", "MAN", "STO", "HR"],
    datasets: [
      {
        label: "Total",
        data: [19, 7, 9, 15, 5, 10],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Closed",
        data: [14, 6, 8, 15, 5, 9],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
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
        </div>
        <div className="Container-body">
          <div className="cards-container">
            <div className="Cards">
              <div className="C-content">
                <h5>Total Projects</h5>
                <h1>8</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Total Projects</h5>
                <h1>2</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Closed</h5>
                <h1>2</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Running</h5>
                <h1>2</h1>
              </div>
            </div>
            <div className="Cards">
              <div className="C-content">
                <h5>Closure Delay</h5>
                <h1>2</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-Container">
          <h3>Department - wise Total VS Closed</h3>

          <div className="chart">
            <div className="chart-container">
              <BarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
