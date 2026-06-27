import api from "../../../api/axios";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const guestLogin = async () => {
  const { data } = await api.post("/auth/guest");
  return data;
};

export const refreshToken = async () => {
  const { data } = await api.post("/auth/refresh-token");
  return data;
};