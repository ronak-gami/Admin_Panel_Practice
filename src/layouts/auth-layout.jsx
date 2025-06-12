import withAuth from "../hoc/with-auth";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";
import CustomHeader from "../shared/CustomHeader";

const NewOutlet = withAuth(Outlet);

const AuthLayout = () => {
  return (
    <>
      <CustomHeader />
      <Box sx={{ backgroundColor: COLORS.background }}>
        <NewOutlet />
      </Box>
    </>
  );
};
export default AuthLayout;