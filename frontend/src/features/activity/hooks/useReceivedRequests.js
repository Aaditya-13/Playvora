import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";

import { getReceivedRequests } from "../api/joinRequest.api";

export default function useReceivedRequests(activityId) {
  const query = useQuery({
    queryKey: QUERY_KEYS.JOIN_REQUESTS,
    queryFn: getReceivedRequests,
    staleTime: 60 * 1000,
  });

  const requests =
    (query.data?.data ?? []).filter(
      (request) =>
        request.activity._id === activityId &&
        request.status === "pending"
    );

  return {
    ...query,
    requests,
  };
}