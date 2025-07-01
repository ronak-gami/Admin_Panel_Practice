import PropTypes from "prop-types";
import { Box, Paper, Typography, Alert } from "@mui/material";
import { Bar, Line, Pie, Doughnut, Radar } from "react-chartjs-2";
import { COLORS } from "../utils/colors";

export const ChartRenderer = ({
  type,
  data,
  options,
  title,
  value,
  subtitle,
  percentage,
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: COLORS.NEUTRAL[700],
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: COLORS.NEUTRAL[700],
        },
        grid: {
          color: COLORS.NEUTRAL[200],
        },
      },
      y: {
        ticks: {
          color: COLORS.NEUTRAL[700],
        },
        grid: {
          color: COLORS.NEUTRAL[200],
        },
      },
    },
  };

  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options?.plugins,
    },
    scales: {
      ...defaultOptions.scales,
      ...options?.scales,
    },
  };

  const renderChart = () => {
    switch (type.toLowerCase()) {
      case "bar":
        return <Bar options={chartOptions} data={data} />;
      case "line":
        return <Line options={chartOptions} data={data} />;
      case "pie":
        return <Pie options={chartOptions} data={data} />;
      case "doughnut":
        return <Doughnut options={chartOptions} data={data} />;
      case "radar":
        return <Radar options={chartOptions} data={data} />;
      default:
        return (
          <Alert severity="warning" variant="outlined">
            Chart type &quot;{type}&quot; is not supported.
          </Alert>
        );
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${COLORS.NEUTRAL[400]}`,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {title && (
        <Typography variant="body1" color="text.primary">
          {title}
        </Typography>
      )}
      {value && (
        <Typography
          variant="h3"
          component="h2"
          sx={{ my: 1, fontWeight: "bold" }}
        >
          {value}
        </Typography>
      )}
      {subtitle && percentage && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body" component="span" color="text.secondary">
            {subtitle}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "success.main", fontWeight: "bold", ml: 1 }}
          >
            {percentage}
          </Typography>
        </Box>
      )}
      <Box sx={{ height: "250px" }}>{renderChart()}</Box>
    </Paper>
  );
};

ChartRenderer.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  subtitle: PropTypes.string,
  percentage: PropTypes.string,
};

ChartRenderer.defaultProps = {
  options: {},
};
