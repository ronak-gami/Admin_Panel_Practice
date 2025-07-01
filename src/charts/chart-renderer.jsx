import PropTypes from "prop-types";
import { Box, Paper, Typography, Alert, useTheme } from "@mui/material";
import { Bar, Line, Pie, Doughnut, Radar } from "react-chartjs-2";

export const ChartRenderer = ({
  type,
  data,
  options,
  title,
  value,
  subtitle,
  percentage,
}) => {
  const theme = useTheme();

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          family: theme.typography.fontFamily,
        },
        bodyFont: {
          family: theme.typography.fontFamily,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
        },
        grid: {
          color: theme.palette.divider,
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
        border: `1px solid ${theme.palette.divider}`,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {title && (
        <Typography variant="body1" color="text.secondary">
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
          <Typography variant="body2" component="span" color="text.secondary">
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
