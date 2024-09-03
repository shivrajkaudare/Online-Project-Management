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
  const data = {
    labels: ["STR", "FIN", "QLT", "MAN", "STO", "HR"],
    datasets: [
      {
        label: "Total",
        data: [19, 7, 9, 15, 5, 10],
        backgroundColor: "#3687DC",
        borderRadius: 10,
        barThickness: 8, // Thinner bars for more space between them
        barPercentage: 0.8,
        categoryPercentage: 0.5,
      },
      {
        label: "Closed",
        data: [14, 6, 8, 15, 5, 9],
        backgroundColor: "#7EC858",
        borderRadius: 10,
        barThickness: 8, // Thinner bars for more space between them
        barPercentage: 0.8,
        categoryPercentage: 0.5,
      },
    ],
  };

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
    grouped: true, // Ensure bars are grouped but have space between them
  };

  return (
    <div style={{ width: "100%", height: "370px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
