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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the correct state

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/projects/department-summary"
        );
        const data = response.data;

        const departments = data.map((d) => {
          const percentage =
            d.totalProjects > 0
              ? ((d.closedProjects / d.totalProjects) * 100).toFixed(1)
              : 0;
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
              barThickness: isSmallScreen ? 5 : 8,
              barPercentage: 0.6, // Space between bars in the same group
              categoryPercentage: 0.5, // Space between groups of bars
              datalabels: {
                display: true,
                anchor: "end",
                align: "top",
                formatter: (value) => value, // Show only number
                color: "black",
                font: {
                  size: isSmallScreen ? 10 : 12,
                },
              },
            },
            {
              label: "Closed ",
              data: closedProjects,
              backgroundColor: "#7EC858",
              borderRadius: 10,
              barThickness: isSmallScreen ? 5 : 8,
              barPercentage: 0.6,
              categoryPercentage: 0.5,
              datalabels: {
                display: true,
                anchor: "end",
                align: "top",
                formatter: (value) => value, // Show only number
                color: "black",
                font: {
                  size: isSmallScreen ? 10 : 12,
                },
              },
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
            size: isSmallScreen ? 10 : 12,
          },
        },
      },
      datalabels: {
        display: false, // Global config to turn off labels
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isSmallScreen ? 10 : 12,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          font: {
            size: isSmallScreen ? 12 : 14,
          },
        },
        grid: {
          drawBorder: false,
        },
      },
    },
  };

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
