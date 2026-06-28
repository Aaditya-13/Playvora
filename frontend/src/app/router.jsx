import { createBrowserRouter } from "react-router-dom";

import ROUTES from "../constants/routes";

import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";

import GuestRoute from "../routes/GuestRoute";
import ProtectedRoute from "../routes/ProtectedRoute";

import Landing from "../features/auth/pages/Landing";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Home from "../features/home/pages/Home.jsx";
import Search from "../features/search/pages/Search";
import CreateActivity from "../features/activity/pages/CreateActivity";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Profile from "../features/profile/pages/Profile";

import ActivityDetails from "../features/activity/pages/ActivityDetails.jsx";

import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LANDING,
            element: <Landing />,
          },
          {
            path: ROUTES.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTES.REGISTER,
            element: <Register />,
          },
          // {
          //   path: "/test",
          //   element: <LeafletMap />
          // }
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
          {
            path: ROUTES.SEARCH,
            element: <Search />,
          },
          {
            path: ROUTES.ACTIVITY_DETAILS,
            element: <ActivityDetails />,
          },
          {
            path: ROUTES.CREATE,
            element: <CreateActivity />,
          },
          {
            path: ROUTES.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: ROUTES.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;