import { useState } from "react";
import withUser from "../hoc/with-user";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PersonIcon,
  TaskOutlined as TaskIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { COLORS } from "../utils/colors";
import { URLS } from "../constants/urls";
import theme from "../theme";
import { LogoutIcon } from "../assets/icons";
import { clearAuthData } from "../redux/slices/auth.slice";
import CustomModal from "../shared/custom-model";
import Button from "../shared/custom-button";

const drawerWidth = 250;
const closedDrawerWidth = 65;

const menuItems_Admin = [
  {
    title: "Dashboard",
    path: URLS.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    title: "Users",
    path: URLS.USERS,
    icon: <PersonIcon />,
  },
  {
    title: "Tasks",
    path: URLS.TASKS,
    icon: <TaskIcon />,
  },
];

const menuItems_Users = [
  {
    title: "Dashboard",
    path: URLS.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    title: "Tasks",
    path: URLS.TASKS,
    icon: <TaskIcon />,
  },
];

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.userData) || null;
  const menuItems = role === "admin" ? menuItems_Admin : menuItems_Users;
  const [open, setOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerHover = (isHover) => {
    if (!open && !isMobile) {
      setIsHovered(isHover);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

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

  const isDrawerOpen = open || isHovered;

  return (
    <Box sx={{ height: "100vh" }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            left: 16,
            top: 8,
            zIndex: 1200,
            color: theme.palette.primary.contrastText,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        onMouseEnter={() => handleDrawerHover(true)}
        onMouseLeave={() => handleDrawerHover(false)}
        sx={{
          width: isDrawerOpen ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : closedDrawerWidth,
            boxSizing: "border-box",
            backgroundColor: COLORS.PRIMARY[25],
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
          {isDrawerOpen ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color={theme.palette.primary.main}
                sx={{ fontWeight: 900, fontSize: 24 }}
              >
                Insight
              </Typography>
              <Typography
                color={theme.palette.primary.main}
                sx={{ fontSize: 24 }}
              >
                Platform
              </Typography>
            </Box>
          ) : null}
          {!isMobile && <IconButton />}
        </Box>
        <Box sx={{ height: "1px", backgroundColor: COLORS.NEUTRAL[400] }} />
        <List sx={{ padding: "12px 0px" }}>
          {menuItems.map((item) => (
            <ListItem
              disablePadding
              key={item.path}
              sx={{
                borderLeft:
                  location.pathname === item.path
                    ? `7px solid ${COLORS.PRIMARY.main}`
                    : `7px solid ${COLORS.PRIMARY.contrastText}`,
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.primary[75]
                    : "transparent",
              }}
            >
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  justifyContent: isDrawerOpen ? "initial" : "center",
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isDrawerOpen ? 2 : "auto",
                    justifyContent: "center",
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : COLORS.NEUTRAL.dark,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: isDrawerOpen ? 1 : 0,
                    "& .MuiListItemText-primary": {
                      color:
                        location.pathname === item.path
                          ? theme.palette.primary.main
                          : COLORS.NEUTRAL.dark,
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ height: "1px", backgroundColor: COLORS.NEUTRAL[400] }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogoutClick}
            sx={{
              justifyContent: isDrawerOpen ? "initial" : "center",
              "&:hover": {
                backgroundColor: "transparent",
                cursor: "pointer",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent",
              },
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                color: COLORS.ERROR[600],
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                opacity: isDrawerOpen ? 1 : 0,
                "& .MuiListItemText-primary": {
                  color: COLORS.ERROR[600],
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>

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
            <Button variant="contained" fullWidth onClick={handleConfirmLogout}>
              Logout
            </Button>
          </Box>
        }
      >
        <Typography>Are you sure you want to logout?</Typography>
      </CustomModal>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          ml: isMobile ? 0 : `${closedDrawerWidth}px`,
          width: isMobile ? "100%" : `calc(100% - ${closedDrawerWidth}px)`,
          backgroundColor: theme.palette.neutral[25],
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(isDrawerOpen && {
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

const ProtectedDashboard = withUser(DashboardLayout);

export default ProtectedDashboard;
