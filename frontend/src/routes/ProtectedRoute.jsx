import { Navigate, Outlet } from "react-router-dom";

import ROUTES from "../constants/routes";
import useCurrentUser from "../features/auth/hooks/useCurrentUser";

export default function ProtectedRoute() {
  const { isLoading, isSuccess } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSuccess) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}