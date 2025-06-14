import useRoutes from "../hooks/use-route";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";

const Routing = () => {
  const { authRoutes, protectedRoutes } = useRoutes();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ id, ...otherData }) => (
          <Route index key={id} {...otherData} />
        ))}
      </Route>

      {/* Private routes for user */}
      {/* <Route element={<PrivateLayout />}>
        {privateRoutes.map(({ id, ...otherData }) => (
          <Route index key={id} {...otherData} />
        ))}
      </Route> */}

      {/* Protected routes for admin */}
      <Route element={<DashboardLayout />}>
        {protectedRoutes.map(({ id, ...otherData }) => (
          <Route index key={id} {...otherData} />
        ))}
      </Route>

      {/* 404 route */}
      <Route path="*" element={<p>404 | Not Found</p>} />
    </Routes>
  );
};

export default Routing;
