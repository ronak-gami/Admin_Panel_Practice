import { Box, Typography } from "@mui/material";
import { NotificationsNone as NotificationIcon } from "@mui/icons-material";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { URLS } from "../../constants/urls";
import Button from "../custom-button";
import { LoginIcon, RegisterIcon } from "../../assets/icons";

const CustomHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formattedPathName = location.pathname
    .replace("/", "")
    .replace(/^\w/, (c) => c.toUpperCase());
  const { token } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.main }}>
      <Box
        sx={{
          padding: "4px 24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {token ? (
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.contrastText,
                fontWeight: 500,
              }}
            >
              {formattedPathName} overview
            </Typography>
          </Box>
        ) : (
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
        )}

        {token ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {" "}
            <NotificationIcon
              sx={{ color: theme.palette.primary.contrastText }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              {userData.firstName || ""} {userData.lastName || ""}
            </Typography>
          </Box>
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
      </Box>
    </Box>
  );
};

export default CustomHeader;
