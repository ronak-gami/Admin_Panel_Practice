import { Box, Typography, Paper, Grid } from "@mui/material";
import ChartCard from "../../../shared/chartcard";
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
import { useAdminDashboard } from "./useAdmin-dashboard";
import CustomHeader from "../../../shared/custom-header";
import { COLORS } from "../../../utils/colors";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  const {
    summaryStats,
    TasksPieChartByStatus,
    TasksPieChartByPriority,
    StatusTrendsLineChart,
    PriorityTrendsLineChart,
    TasksCompilationLineChart,
  } = useAdminDashboard();

  return (
    <>
      <CustomHeader />
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          {summaryStats.map((stat) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={stat.label}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `1px solid ${COLORS.NEUTRAL[400]}`,
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" color={COLORS.NEUTRAL[700]}>
                  {stat.label}
                </Typography>
                <Typography variant="h6" color={COLORS.PRIMARY[500]}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid size={{ xs: 6, sm: 6, md: 4 }}>
            <ChartCard title="Tasks by Status">
              <TasksPieChartByStatus />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 4 }}>
            <ChartCard title="Tasks by Priority">
              <TasksPieChartByPriority />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 4 }}>
            <ChartCard title="Task Compilation Rate (Last 6 Months)">
              <TasksCompilationLineChart />
            </ChartCard>
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <ChartCard title="Status Trends (Last 7 Days)">
              <StatusTrendsLineChart />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <ChartCard title="Priority Trends (Last 7 Days)">
              <PriorityTrendsLineChart />
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
