import api from "../../../api/axios";

export const getBootstrap = async () => {
  const { data } = await api.get("/bootstrap");

  return data;
};