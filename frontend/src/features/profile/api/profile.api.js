import api from "../../../api/axios";

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await api.patch(
    "/users/profile",
    payload
  );

  return response.data;
};

export const updateFavouriteSports = async (payload) => {
  const response = await api.patch(
    "/users/favourite-sports",
    payload
  );

  return response.data;
};

export const updateAvatar = async (formData) => {
  const response = await api.patch(
    "/users/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const changePassword = async (payload) => {
  const response = await api.patch(
    "/users/change-password",
    payload
  );

  return response.data;
};

export const deleteAccount = async (payload) => {
  const response = await api.delete(
    "/auth/delete-account",
    {
      data: payload,
    }
  );

  return response.data;
};


export const getProfileData = async () => {
  const [
    userResponse,
    statsResponse,
  ] = await Promise.all([
    api.get("/auth/me"),
    api.get("/users/me/stats"),
  ]);

  return {
    user: userResponse.data.data,
    stats: statsResponse.data.data,
  };
};