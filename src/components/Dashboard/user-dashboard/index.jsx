import CustomHeader from "../../../shared/custom-header";
import { Box, Grid } from "@mui/material";
import ChartCard from "../../../shared/chartcard";
import { useUserDashboard } from "./useUser-dashboard";

const UserDashboard = () => {
  const { StatusBarChart, TasksLineChart, TeamPerformanceChart } =
    useUserDashboard();

  return (
    <>
      <CustomHeader />
      <Box sx={{ p: 3 }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mb: 4 }}
        >
          <Grid size={6}>
            <ChartCard
              title="Tasks by Status"
              value="120"
              subtitle="This Month"
              percentage="+10%"
            >
              <StatusBarChart />
            </ChartCard>
          </Grid>
          <Grid size={6}>
            <ChartCard
              title="Tasks Over Time"
              value="30"
              subtitle="Last 6 Months"
              percentage="+5%"
            >
              <TasksLineChart />
            </ChartCard>
          </Grid>
        </Grid>
        <ChartCard
          title="Tasks Over Time"
          value="30"
          subtitle="Last 6 Months"
          percentage="+5%"
        >
          <TeamPerformanceChart />
        </ChartCard>
      </Box>
    </>
  );
};

export default UserDashboard;
