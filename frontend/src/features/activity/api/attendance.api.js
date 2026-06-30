import api from "../../../api/axios";

export const getAttendance = async (activityId) => {
  const { data } = await api.get(
    `/attendance/${activityId}`
  );

  return data;
};

export const markAttendance = async (
  activityId,
  attendance
) => {
  const response = await api.post(
    `/attendance/${activityId}`,
    {
      attendance,
    }
  );

  return response.data;
};