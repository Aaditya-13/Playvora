import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import useBootstrap from "../features/bootstrap/hooks/useBootstrap";
import LocationPermissionDialog from "../components/shared/LocationPermissionDialog";
import QUERY_KEYS from "../constants/queryKeys";
import useAuthStore from "../store/authStore";
import { getSavedLocation } from "../utils/locationStorage";
import useLocation from "../hooks/useLocation";

export default function AppInitializer({ children }) {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { requestBrowserLocation, isLoading } = useLocation();
  const { data, isSuccess } = useBootstrap({ retry: false });

  const [isDialogDismissed, setIsDialogDismissed] = useState(false);

  const needsLocation = !getSavedLocation();
  const showLocationDialog = isSuccess && needsLocation && !isDialogDismissed;

  useEffect(() => {
    if (!isSuccess || !data) {
      return;
    }

    queryClient.setQueryData(QUERY_KEYS.BOOTSTRAP, data);
    queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, data.data.user);
    setUser(data.data.user);
  }, [data, isSuccess, queryClient, setUser]);

  const handleAllow = async () => {
    try {
      await requestBrowserLocation();
      toast.success("Location saved successfully.");
    } catch {
      toast.error("Location permission denied. You can set a saved location later from your Profile.");
    } finally {
      setIsDialogDismissed(true);
    }
  };

  const handleSkip = () => {
    toast("You can set a saved location later from your Profile.");
    setIsDialogDismissed(true);
  };

  return (
    <>
      {children}
      <LocationPermissionDialog
        open={showLocationDialog}
        onAllow={handleAllow}
        onSkip={handleSkip}
        isLoading={isLoading}
      />
    </>
  );
}