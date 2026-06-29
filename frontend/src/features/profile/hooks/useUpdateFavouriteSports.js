import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import QUERY_KEYS from "../../../constants/queryKeys";
import { updateFavouriteSports } from "../api/profile.api";

export default function useUpdateFavouriteSports() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFavouriteSports,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOTSTRAP,
      });

      toast.success("Favourite sports updated.");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update favourite sports."
      );
    },
  });
}