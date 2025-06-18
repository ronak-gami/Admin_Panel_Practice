import { Box, Typography, Paper, Grid } from "@mui/material";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import CustomHeader from "../../shared/custom-header";
import theme from "../../theme";
import { useDashboard } from "./useDashboard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const {
    statusChartData,
    priorityChartData,
    chartOptions,
    lineChartData,
    lineChartOptions,
  } = useDashboard();

  return (
    <>
      <CustomHeader />
      <Box sx={{ padding: 3, backgroundColor: theme.palette.neutral[50] }}>
        {/* Pie Charts Container */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.neutral[800],
            mb: 2,
          }}
        >
          Current Task Distribution
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mb: 4 }}
        >
          <Grid size={6}>
            <Paper
              elevation={9}
              sx={{
                height: 420,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                color={theme.palette.neutral[800]}
              >
                Tasks by Status
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Pie data={statusChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper
              elevation={9}
              sx={{
                height: 420,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                color={theme.palette.neutral[800]}
              >
                Tasks by Priority
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Pie data={priorityChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.neutral[800],
            mb: 2,
          }}
        >
          Task Trends
        </Typography>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mb: 4 }}
        >
          <Grid size={6}>
            <Paper
              elevation={9}
              sx={{
                height: 420,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                color={theme.palette.neutral[800]}
              >
                Status Trends (Last 7 Days)
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Line data={lineChartData.status} options={lineChartOptions} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper
              elevation={9}
              sx={{
                height: 420,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                color={theme.palette.neutral[800]}
              >
                Priority Trends (Last 7 Days)
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Line
                  data={lineChartData.priority}
                  options={lineChartOptions}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
