import withAuth from "../hoc/with-auth";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";
import CustomHeader from "../shared/CustomHeader";

const NewOutlet = withAuth(Outlet);

const AuthLayout = () => {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <CustomHeader />
      <Box
        sx={{
          backgroundColor: COLORS.SECONDARY[50],
          overflow: "hidden",
        }}
      >
        <NewOutlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
