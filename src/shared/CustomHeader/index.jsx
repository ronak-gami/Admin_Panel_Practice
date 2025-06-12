import { Container, Typography, IconButton } from "@mui/material";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../redux/slices/auth.slice";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomButton from "../CustomButton";

const CustomHeader = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    dispatch(clearAuthData());
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate(URLS.LOGIN);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.primary,
          gap: 3,
        }}
      >
        <IconButton
          color={COLORS.white}
          onClick={() => {
            navigate(URLS.LOGIN);
          }}
          sx={[!userData ? { cursor: "pointer" } : {}, { color: COLORS.white }]}
        >
          {userData
            ? `Welcome, ${userData.firstName} ${userData.lastName}`
            : "Login"}
        </IconButton>

        <IconButton
          onClick={userData ? handleLogoutClick : () => navigate(URLS.REGISTER)}
          sx={{ color: COLORS.white }}
        >
          {userData ? <LogoutIcon /> : "Register"}
        </IconButton>
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 1,
          },
        }}
      >
        <DialogTitle sx={{ color: COLORS.primary }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <CustomButton
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: COLORS.lightgray,
              "&:hover": {
                backgroundColor: COLORS.lightgray,
                opacity: 0.9,
              },
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleConfirmLogout}
            sx={{
              backgroundColor: COLORS.primary,
              "&:hover": {
                backgroundColor: COLORS.hover,
                opacity: 0.9,
              },
            }}
          >
            Logout
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomHeader;
