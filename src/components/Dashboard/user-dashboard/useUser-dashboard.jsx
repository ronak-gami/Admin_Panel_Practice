import { useMemo } from "react";
import { COLORS } from "../../../utils/colors";
import { ChartRenderer } from "../../../charts/chart-renderer";

export const useUserDashboard = () => {
  const StatusBarChart = () => {
    const data = useMemo(
      () => ({
        labels: ["Completed", "In Progress", "Pending"],
        datasets: [
          {
            data: [45, 115, 60],
            backgroundColor: COLORS.PRIMARY[50],
            borderColor: COLORS.PRIMARY[400],
            borderWidth: { left: 2 },
            borderSkipped: false,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
          },
        ],
      }),
      []
    );

    const options = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { display: false },
          ticks: { color: COLORS.NEUTRAL[700] },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: {
            display: true,
            color: COLORS.NEUTRAL[700],
          },
          border: { display: false },
        },
      },
    };

    return (
      <ChartRenderer
        type="bar"
        data={data}
        options={options}
        title="Tasks by Status"
        value="120"
        subtitle="This Month"
        percentage="+10%"
      />
    );
  };

  const TasksLineChart = () => {
    const data = useMemo(
      () => ({
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
      }),
      []
    );

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

    return (
      <ChartRenderer
        type="line"
        data={data}
        options={options}
        title="Task Progress (Last 6 Months)"
        value="30"
        subtitle="Last 6 Months"
        percentage="+5%"
      />
    );
  };

  const TeamPerformanceChart = () => {
    const data = useMemo(
      () => ({
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
      }),
      []
    );

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

    return (
      <ChartRenderer
        type="bar"
        data={data}
        options={options}
        title="Team Performance"
        value="30"
        subtitle="Last 6 Months"
        percentage="+5%"
      />
    );
  };

  return {
    StatusBarChart,
    TasksLineChart,
    TeamPerformanceChart,
  };
};
