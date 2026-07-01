import { useState, useCallback } from "react";

export default function useCurrentLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error("Geolocation is not supported.");
        setError(err);
        reject(err);
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setIsLoading(false);
          setError(err);
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    });
  }, []);

  return {
    getCurrentLocation,
    requestBrowserLocation: getCurrentLocation,
    isLoading,
    error,
  };
}