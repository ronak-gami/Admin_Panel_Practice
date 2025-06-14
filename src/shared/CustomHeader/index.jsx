import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "../CustomButton";
import { LoginIcon, LogoutIcon, RegisterIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { COLORS } from "../../utils/colors";
import { clearAuthData } from "../../redux/slices/auth.slice";
import CustomModal from "../custom-model";

const CustomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    dispatch(clearAuthData());
    navigate(URLS.LOGIN);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.primary.main }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            color={theme.palette.primary.contrastText}
            sx={{ fontWeight: 900, fontSize: 30 }}
          >
            Insight
          </Typography>
          <Typography
            color={theme.palette.primary.contrastText}
            sx={{ fontSize: 30 }}
          >
            Platform
          </Typography>
        </Box>

        {token ? (
          <Button
            onClick={handleLogoutClick}
            variant="contained"
            sx={{
              gap: 1,
              "&:hover": {
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
              },
            }}
          >
            <LogoutIcon /> Logout
          </Button>
        ) : (
          <Box gap={2} sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => {
                navigate(URLS.LOGIN);
              }}
              variant="contained"
              sx={{
                gap: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <LoginIcon /> Login
            </Button>

            <Button
              onClick={() => {
                navigate(URLS.REGISTER);
              }}
              variant="contained"
              sx={{
                gap: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <RegisterIcon /> Register
            </Button>
          </Box>
        )}
        <CustomModal
          open={openDialog}
          onClose={handleCloseDialog}
          title="Confirm Logout"
          titleSx={{ color: theme.palette.primary.main }}
          actions={
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Button variant="outlined" fullWidth onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmLogout}
              >
                Logout
              </Button>
            </Box>
          }
        >
          <Typography>Are you sure you want to logout?</Typography>
        </CustomModal>
      </Container>
    </Box>
  );
};

export default CustomHeader;
