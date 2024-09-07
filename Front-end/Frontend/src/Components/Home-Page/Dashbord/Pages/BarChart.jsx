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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/projects/department-summary"
        );
        const data = response.data;

        // Prepare chart data based on the response
        const departments = data.map((d) => d.department);
        const totalProjects = data.map((d) => d.totalProjects);
        const closedProjects = data.map((d) => d.closedProjects);

        const formattedData = {
          labels: departments,
          datasets: [
            {
              label: "Total Projects",
              data: totalProjects,
              backgroundColor: "#3687DC",
              borderRadius: 10,
              barThickness: 8,
              barPercentage: 0.8,
              categoryPercentage: 0.5,
            },
            {
              label: "Closed Projects",
              data: closedProjects,
              backgroundColor: "#7EC858",
              borderRadius: 10,
              barThickness: 8,
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
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 30,
          font: {
            size: 12,
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
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          font: {
            size: 14,
          },
        },
        grid: {
          drawBorder: false,
        },
      },
    },
    grouped: true,
  };

  return (
    <div style={{ width: "100%", height: "370px" }}>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
