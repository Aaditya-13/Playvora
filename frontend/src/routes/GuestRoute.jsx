import { Navigate, Outlet } from "react-router-dom";

import ROUTES from "../constants/routes";
import useCurrentUser from "../features/auth/hooks/useCurrentUser";

export default function GuestRoute() {
  const { isLoading, isSuccess } = useCurrentUser();

  if (isSuccess) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}