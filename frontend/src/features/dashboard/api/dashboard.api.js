import api from "../../../api/axios";

export const getDashboardData = async () => {
  const [
    userResponse,
    statsResponse,
    hostedResponse,
    joinedResponse,
  ] = await Promise.all([
    api.get("/auth/me"),
    api.get("/users/me/stats"),
    api.get("/activities/my-created"),
    api.get("/activities/my-joined"),
  ]);

  return {
    user: userResponse.data.data,
    stats: statsResponse.data.data,
    hostedActivities: hostedResponse.data.data,
    joinedActivities: joinedResponse.data.data,
  };
};