import api from "../../../api/axios.js";

export const getNearbyActivities = async (params) => {
  const { data } = await api.get("/activities/nearby", { params });
  return data;
};

export const getActivityDetails = async (activityId) => {
  const { data } = await api.get(`/activities/${activityId}`);
  return data;
};

export const joinActivity = async (activityId) => {
  const { data } = await api.post(`/join-requests/${activityId}`);
  return data;
};


export const leaveActivity = async (activityId) => {
  const { data } = await api.post(`/activities/${activityId}/leave`);
  return data;
};


export const createActivity = async (activityData) => {
  const { data } = await api.post("/activities", activityData);
  return data;
};