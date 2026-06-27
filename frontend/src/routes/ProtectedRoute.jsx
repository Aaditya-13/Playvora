import { Navigate, Outlet } from "react-router-dom";

import ROUTES from "../constants/routes";

export default function ProtectedRoute() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}