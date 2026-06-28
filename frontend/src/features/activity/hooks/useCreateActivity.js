import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import QUERY_KEYS from "../../../constants/queryKeys.js";
import { createActivity } from "../api/activity.api.js";
import { toast } from "sonner";

export default function useCreateActivity() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: (response) => {
      toast.success("Activity created successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NEARBY_ACTIVITIES] });
      
      const newActivityId = response.data?._id;
      if (newActivityId) {
        navigate(`/activities/${newActivityId}`);
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create activity.");
    },
  });
}