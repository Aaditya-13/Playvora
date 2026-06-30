import ROUTES from "../../../constants/routes";

export const getHostedActions = (
  navigate
) => ({
  primary: (activity) => ({
    label: "Manage",
    onClick: () =>
      navigate(
        ROUTES.MANAGE_ACTIVITY.replace(
          ":id",
          activity._id
        )
      ),
  }),

  secondary: (activity) => ({
    label: "Edit",
    onClick: () =>
      navigate(
        ROUTES.EDIT_ACTIVITY.replace(
          ":id",
          activity._id
        )
      ),
  }),
});

export const getJoinedActions = (
  navigate,
  leaveActivity
) => ({
  primary: (activity) => ({
    label: "View",
    onClick: () =>
      navigate(
        ROUTES.ACTIVITY_DETAILS.replace(
          ":id",
          activity._id
        )
      ),
  }),

  secondary: (activity) => ({
    label: "Leave",
    onClick: () =>
      leaveActivity(activity._id),
  }),
});