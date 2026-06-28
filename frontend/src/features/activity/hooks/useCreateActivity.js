import { useMutation, useQueryClient } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { createActivity } from "../api/activity.api";

export default function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEARBY_ACTIVITIES,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ACTIVITIES,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOTSTRAP,
      });
    },
  });
}