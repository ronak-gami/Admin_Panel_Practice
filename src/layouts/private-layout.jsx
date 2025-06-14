import withUser from "../hoc/with-user";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";

const NewOutlet = withUser(Outlet);

const PrivateLayout = () => {
  return (
    <Box sx={{ backgroundColor: COLORS.SECONDARY[50] }}>
      <NewOutlet />
    </Box>
  );
};

export default PrivateLayout;
