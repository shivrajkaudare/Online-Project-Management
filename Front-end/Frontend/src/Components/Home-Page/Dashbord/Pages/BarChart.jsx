import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check for small screen
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 480); // e.g., 480px breakpoint for small screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set the initial state

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/projects/department-summary"
        );
        const data = response.data;

        // Prepare chart data based on the response
        const departments = data.map((d) => {
          const percentage =
            d.totalProjects > 0
              ? ((d.closedProjects / d.totalProjects) * 100).toFixed(1) // Round to one decimal place
              : 0;
          // Return the percentage and department as an array to split lines
          return [`${percentage}%`, `${d.department}`];
        });
        const totalProjects = data.map((d) => d.totalProjects);
        const closedProjects = data.map((d) => d.closedProjects);

        const formattedData = {
          labels: departments,
          datasets: [
            {
              label: "Total ",
              data: totalProjects,
              backgroundColor: "#025AAB",
              borderRadius: 10,
              barThickness: isSmallScreen ? 5 : 8, // Thinner bars for smaller screens
              barPercentage: 0.8,
              categoryPercentage: 0.5,
            },
            {
              label: "Closed ",
              data: closedProjects,
              backgroundColor: "#7EC858",
              borderRadius: 10,
              barThickness: isSmallScreen ? 5 : 8,
              barPercentage: 0.8,
              categoryPercentage: 0.5,
            },
          ],
        };

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: isSmallScreen ? 10 : 30,
          font: {
            size: isSmallScreen ? 10 : 12, // Smaller font for legend on small screens
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isSmallScreen ? 10 : 12, // Smaller font for ticks
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          font: {
            size: isSmallScreen ? 12 : 14, // Smaller font for y-axis
          },
        },
        grid: {
          drawBorder: false,
        },
      },
    },
    grouped: true,
  };

  // for smaller screen
  return (
    <div style={{ width: "100%", height: isSmallScreen ? "375px" : "370px" }}>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
