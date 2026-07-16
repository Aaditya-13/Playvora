import { useCallback } from "react";
import { toast } from "sonner";

import useCurrentLocation from "./useCurrentLocation";

import {
  getSavedLocation,
  saveLocation,
  clearSavedLocation,
} from "../utils/locationStorage";

export default function useLocation() {
  const {
    getCurrentLocation,
    isLoading,
    error,
  } = useCurrentLocation();

  const requestBrowserLocation = useCallback(async () => {
    const location = await getCurrentLocation();

    saveLocation({
      ...location,
      source: "browser",
    });

    return {
      ...location,
      source: "browser",
    };
  }, [getCurrentLocation]);

  const saveManualLocation = useCallback((latitude, longitude) => {
    saveLocation({
      latitude,
      longitude,
      source: "manual",
    });
  }, []);

  const getLocation = useCallback(async () => {
    const saved = getSavedLocation();

    if (saved) {
      return saved;
    }

    return null;
  }, []);

  const clearLocation = useCallback(() => {
    clearSavedLocation();
  }, []);

  return {
    requestBrowserLocation,
    getLocation,
    getSavedLocation,
    saveManualLocation,
    clearLocation,

    isLoading,
    error,
  };
}