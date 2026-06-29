import api from "../../../api/axios.js";

export const getActivityDetails = async (activityId) => {
  const { data } = await api.get(`/activities/${activityId}`);

  return data;
};

export const joinActivity = async (activityId) => {
  const { data } = await api.post(
    `/activities/${activityId}/join`
  );

  return data;
};

export const leaveActivity = async (activityId) => {
  const { data } = await api.post(
    `/activities/${activityId}/leave`
  );

  return data;
};

export const createActivity = async (payload) => {
  const { data } = await api.post(
    "/activities",
    payload
  );

  return data;
};