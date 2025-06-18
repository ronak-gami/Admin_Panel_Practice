import { useSelector } from "react-redux";
import { COLORS } from "../../utils/colors";
import { useMemo } from "react";

export const useDashboard = () => {
  const tasks = useSelector((state) => state.data.tasks);

  const statusChartData = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: ["Pending", "Approved", "Rejected"],
      datasets: [
        {
          data: [
            statusCounts.pending || 0,
            statusCounts.approved || 0,
            statusCounts.rejected || 0,
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
    };
  }, [tasks]);

  const priorityChartData = useMemo(() => {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority.toLowerCase()] =
        (acc[task.priority.toLowerCase()] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          data: [
            priorityCounts.high || 0,
            priorityCounts.medium || 0,
            priorityCounts.low || 0,
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
    };
  }, [tasks]);

  const lineChartData = useMemo(() => {
    // Group tasks by date and count status/priority
    const groupedData = tasks.reduce((acc, task) => {
      const date = new Date(task.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          status: { pending: 0, approved: 0, rejected: 0 },
          priority: { high: 0, medium: 0, low: 0 },
        };
      }
      acc[date].status[task.status.toLowerCase()]++;
      acc[date].priority[task.priority.toLowerCase()]++;
      return acc;
    }, {});

    // Get last 7 days
    const dates = Object.keys(groupedData).sort().slice(-7);

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return {
    statusChartData,
    priorityChartData,
    chartOptions,
    lineChartData,
    lineChartOptions,
  };
};
