import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true, // http-only cookie
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
