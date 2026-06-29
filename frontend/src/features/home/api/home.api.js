import api from "../../../api/axios.js";

export const getNearbyActivities = async ({
  latitude,
  longitude,
  sport,
}) => {
  const params = {
    lat: latitude,
    lng: longitude,
    radius: 5000,
    page: 1,
    limit: 10,
  };

  if (sport) {
    params.sport = sport;
  }

  const response = await api.get(
    "/activities/nearby",
    {
      params,
    }
  );

  return response.data;
};