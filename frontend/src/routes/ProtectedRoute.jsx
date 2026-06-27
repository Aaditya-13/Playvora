import { Navigate, Outlet } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import QUERY_KEYS from "../constants/queryKeys";
import ROUTES from "../constants/routes";

export default function ProtectedRoute() {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(
    QUERY_KEYS.CURRENT_USER
  );

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}