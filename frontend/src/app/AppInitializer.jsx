import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useBootstrap from "../features/bootstrap/hooks/useBootstrap";
import QUERY_KEYS from "../constants/queryKeys";

export default function AppInitializer({ children }) {
  const queryClient = useQueryClient();

  const { data, isSuccess } = useBootstrap({
    retry: false,
  });

  useEffect(() => {
    if (!isSuccess) return;

    queryClient.setQueryData(
      QUERY_KEYS.BOOTSTRAP,
      data
    );

    queryClient.setQueryData(
      QUERY_KEYS.CURRENT_USER,
      data.user
    );
  }, [data, isSuccess, queryClient]);

  return children;
}