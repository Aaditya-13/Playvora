import api from "../../../api/axios";

export const getMyCreatedActivities = async () => {
  const response = await api.get("/activities/my-created");
  return response.data;
};

export const getMyJoinedActivities = async () => {
  const response = await api.get("/activities/my-joined");
  return response.data;
};