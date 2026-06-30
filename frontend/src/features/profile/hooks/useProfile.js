import { useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "../../../constants/queryKeys";
import { getProfileData } from "../api/profile.api";

export default function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: getProfileData,
    staleTime: 5 * 60 * 1000,
  });
}