import { useState } from "react";
import withUser from "../hoc/with-user";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CustomHeader from "../shared/CustomHeader";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Task as TaskIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { COLORS } from "../utils/colors";
import { URLS } from "../constants/urls";
import { useSelector } from "react-redux";

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
  const { role } = useSelector((state) => state.auth.userData) || null;
  const menuItems = role === "admin" ? menuItems_Admin : menuItems_Users;
  const [open, setOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
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

  const isDrawerOpen = open || isHovered;

  return (
    <>
      <CustomHeader />

      {/* Mobile Menu Toggle */}
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
            color: COLORS.white,
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
            backgroundColor: COLORS.secondary,
            marginTop: "50px",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: 1,
            minHeight: 48,
          }}
        >
          {!isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </Box>

        <List sx={{ padding: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: isDrawerOpen ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    location.pathname === item.path
                      ? COLORS.secondary
                      : "transparent",
                  "&:hover": {
                    backgroundColor: COLORS.hover,
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
                        ? COLORS.primary
                        : COLORS.darkgray,
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
                          ? COLORS.primary
                          : COLORS.darkgray,
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: COLORS.background,
          minHeight: "100vh",
          ml: isMobile ? 0 : `${closedDrawerWidth}px`,
          width: isMobile ? "100%" : `calc(100% - ${closedDrawerWidth}px)`,
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
    </>
  );
};

const ProtectedDashboard = withUser(DashboardLayout);

export default ProtectedDashboard;
