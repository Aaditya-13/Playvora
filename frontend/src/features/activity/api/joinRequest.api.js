import api from "../../../api/axios";

export const getReceivedRequests = async () => {
  const { data } = await api.get("/join-requests/received");
  return data;
};

export const approveRequest = async (requestId) => {
  const { data } = await api.patch(
    `/join-requests/${requestId}/approve`
  );

  return data;
};

export const rejectRequest = async (requestId) => {
  const { data } = await api.patch(
    `/join-requests/${requestId}/reject`
  );

  return data;
};