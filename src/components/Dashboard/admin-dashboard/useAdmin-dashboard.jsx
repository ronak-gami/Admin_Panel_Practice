import { useSelector } from "react-redux";
import { useMemo } from "react";
import { COLORS } from "../../../utils/colors";
import { Line, Pie } from "react-chartjs-2";

export const useAdminDashboard = () => {
  const tasks = useSelector((state) => state.data.tasks);

  const summaryStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "approved").length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    return [
      { label: "Total Tasks", value: total },
      { label: "Completed Tasks", value: completed },
      { label: "Pending Tasks", value: pending },
      { label: "User Activity", value: "Active" },
    ];
  }, [tasks]);

  // Memoized data for charts
  const statusChartData = useMemo(
    () => ({
      labels: ["Pending", "Approved", "Rejected"],
      datasets: [
        {
          data: [
            tasks.filter((t) => t.status === "pending").length,
            tasks.filter((t) => t.status === "approved").length,
            tasks.filter((t) => t.status === "rejected").length,
          ],
          backgroundColor: [
            COLORS.WARNING[100],
            COLORS.PRIMARY[100],
            COLORS.ERROR[100],
          ],
          borderColor: [
            COLORS.WARNING[600],
            COLORS.PRIMARY[600],
            COLORS.ERROR[600],
          ],
          borderWidth: 1,
        },
      ],
    }),
    [tasks]
  );

  const priorityChartData = useMemo(
    () => ({
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          data: [
            tasks.filter((t) => t.priority.toLowerCase() === "high").length,
            tasks.filter((t) => t.priority.toLowerCase() === "medium").length,
            tasks.filter((t) => t.priority.toLowerCase() === "low").length,
          ],
          backgroundColor: [
            COLORS.ERROR[100],
            COLORS.WARNING[100],
            COLORS.PRIMARY[100],
          ],
          borderColor: [
            COLORS.ERROR[600],
            COLORS.WARNING[600],
            COLORS.PRIMARY[600],
          ],
          borderWidth: 1,
        },
      ],
    }),
    [tasks]
  );

  const lineChartData = useMemo(() => {
    const groupedData = tasks.reduce((acc, task) => {
      const date = new Date(task.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          status: { pending: 0, approved: 0, rejected: 0 },
          priority: { high: 0, medium: 0, low: 0 },
        };
      }
      acc[date].status[task.status.toLowerCase()] =
        (acc[date].status[task.status.toLowerCase()] || 0) + 1;
      acc[date].priority[task.priority.toLowerCase()] =
        (acc[date].priority[task.priority.toLowerCase()] || 0) + 1;
      return acc;
    }, {});

    const dates = Object.keys(groupedData)
      .sort((a, b) => new Date(a) - new Date(b))
      .slice(-7);

    return {
      status: {
        labels: dates,
        datasets: [
          {
            label: "Pending",
            data: dates.map((date) => groupedData[date]?.status.pending || 0),
            borderColor: COLORS.WARNING[600],
            backgroundColor: COLORS.WARNING[100],
            tension: 0.4,
          },
          {
            label: "Approved",
            data: dates.map((date) => groupedData[date]?.status.approved || 0),
            borderColor: COLORS.PRIMARY[600],
            backgroundColor: COLORS.PRIMARY[100],
            tension: 0.4,
          },
          {
            label: "Rejected",
            data: dates.map((date) => groupedData[date]?.status.rejected || 0),
            borderColor: COLORS.ERROR[600],
            backgroundColor: COLORS.ERROR[100],
            tension: 0.4,
          },
        ],
      },
      priority: {
        labels: dates,
        datasets: [
          {
            label: "High",
            data: dates.map((date) => groupedData[date]?.priority.high || 0),
            borderColor: COLORS.ERROR[600],
            backgroundColor: COLORS.ERROR[100],
            tension: 0.4,
          },
          {
            label: "Medium",
            data: dates.map((date) => groupedData[date]?.priority.medium || 0),
            borderColor: COLORS.WARNING[600],
            backgroundColor: COLORS.WARNING[100],
            tension: 0.4,
          },
          {
            label: "Low",
            data: dates.map((date) => groupedData[date]?.priority.low || 0),
            borderColor: COLORS.PRIMARY[600],
            backgroundColor: COLORS.PRIMARY[100],
            tension: 0.4,
          },
        ],
      },
    };
  }, [tasks]);

  const TasksPieChartByStatus = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    };
    return <Pie data={statusChartData} options={options} />;
  };

  const TasksPieChartByPriority = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
    };
    return <Pie data={priorityChartData} options={options} />;
  };

  const StatusTrendsLineChart = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    };
    return <Line data={lineChartData.status} options={options} />;
  };

  const PriorityTrendsLineChart = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    };
    return <Line data={lineChartData.priority} options={options} />;
  };

  const TasksCompilationLineChart = () => {
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
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
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

  return {
    summaryStats,
    TasksPieChartByStatus,
    TasksPieChartByPriority,
    StatusTrendsLineChart,
    PriorityTrendsLineChart,
    TasksCompilationLineChart,
  };
};
