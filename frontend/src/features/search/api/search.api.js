import api from "../../../api/axios";

export const searchActivities = async (query) => {
  const response = await api.get("/users/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};