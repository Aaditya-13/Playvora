const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  HOME: "/home",
  SEARCH: "/search",
  CREATE: "/create",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",

  ACTIVITY_DETAILS: "/activities/:id",

  EDIT_PROFILE: "/profile/edit",

  NOT_FOUND: "*",

  EDIT_ACTIVITY: "/activities/:id/edit",

  MANAGE_ACTIVITY: "/activities/:id/manage",

  JOIN_REQUESTS: "/activities/:id/requests",

  ATTENDANCE: "/activities/:id/attendance",

  CANCEL_ACTIVITY: "/activities/:id/cancel",

  COMPLETE_ACTIVITY: "/activities/:id/complete",

  DASHBOARD_ACTIVITY_LIST: "/dashboard/:type",
};

export default ROUTES;