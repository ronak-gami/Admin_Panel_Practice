import CustomHeader from "../../../shared/custom-header";
import { Box, Grid } from "@mui/material";
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
            <StatusBarChart />
          </Grid>
          <Grid size={6}>
            <TasksLineChart />
          </Grid>
        </Grid>
        <TeamPerformanceChart />
      </Box>
    </>
  );
};

export default UserDashboard;
