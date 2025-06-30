import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { COLORS } from "../../../utils/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler
);

export const useUserDashboard = () => {
  const StatusBarChart = () => {
    const data = {
      labels: ["Completed", "In Progress", "Pending"],
      datasets: [
        {
          data: [45, 115, 60],
          backgroundColor: COLORS.PRIMARY[50],
          borderColor: COLORS.PRIMARY[400],
          borderWidth: { top: 2 },
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: COLORS.NEUTRAL[700] },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          border: { display: false },
          beginAtZero: true,
        },
      },
    };

    return <Bar options={options} data={data} />;
  };

  const TasksLineChart = () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [65, 75, 60, 81, 70, 95, 78],
          fill: true,
          backgroundColor: COLORS.PRIMARY[50],
          borderColor: COLORS.PRIMARY[400],
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: COLORS.NEUTRAL[700] },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          border: { display: false },
        },
      },
    };

    return <Line options={options} data={data} />;
  };

  const TeamPerformanceChart = () => {
    const data = {
      labels: ["Team A", "Team B", "Team C"],
      datasets: [
        {
          data: [85, 60, 75],
          backgroundColor: COLORS.PRIMARY[50],
          borderColor: COLORS.PRIMARY[400],
          borderWidth: { top: 2 },
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: COLORS.NEUTRAL[700] },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          border: { display: false },
          beginAtZero: true,
        },
      },
    };

    return <Bar options={options} data={data} />;
  };

  return { StatusBarChart, TasksLineChart, TeamPerformanceChart };
};
