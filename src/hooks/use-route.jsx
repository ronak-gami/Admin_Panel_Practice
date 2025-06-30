import { useMemo } from "react";
import { URLS } from "../constants/urls";
import Register from "../containers/auth/register";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/Dashboard/admin-dashboard";
import UserDashboard from "../components/Dashboard/user-dashboard";
import Users from "../components/Users";
import Tasks from "../components/Tasks";
import ForgotPassword from "../containers/auth/forgotpassword";
import Login from "../containers/auth/login";

const useRoutes = () => {
  const user = useSelector((state) => {
    return state.auth.userData;
  });
  const allRoutes = useMemo(
    () => [
      {
        id: "login",
        path: URLS.LOGIN,
        element: <Login />,
        isAuth: true,
      },
      {
        id: "register",
        path: URLS.REGISTER,
        element: <Register />,
        isAuth: true,
      },
      {
        id: "forgot-password",
        path: URLS.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        isAuth: true,
      },
      {
        id: "dashboard",
        path: URLS.DASHBOARD,
        element:
          user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />,
        isPrivate: true,
        roles: ["user", "admin"],
      },
      {
        id: "users",
        path: URLS.USERS,
        element: <Users />,
        isPrivate: true,
        roles: ["admin"],
      },
      {
        id: "tasks",
        path: URLS.TASKS,
        element: <Tasks />,
        isPrivate: true,
        roles: ["admin", "user"],
      },
    ],
    [user?.role]
  );

  const authRoutes = useMemo(
    () => allRoutes.filter((route) => route.isAuth),
    [allRoutes]
  );

  const privateRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPrivate),
    [allRoutes]
  );

  const protectedRoutes = useMemo(
    () =>
      allRoutes.filter(
        (route) => route.isPrivate && route.roles.includes(user?.role)
      ),
    [allRoutes, user?.role]
  );

  return {
    allRoutes,
    authRoutes,
    privateRoutes,
    protectedRoutes,
  };
};

export default useRoutes;
