import { useEffect, useState } from "react";

const DEFAULT_LOCATION = {
  latitude: 20.0059,
  longitude: 73.791,
};

export default function useCurrentLocation() {
  const [location, setLocation] =
    useState(DEFAULT_LOCATION);

  const [error, setError] = useState(
    navigator.geolocation
      ? null
      : "Geolocation is not supported."
  );

  const [isLoading, setIsLoading] = useState(
    !!navigator.geolocation
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return {
    ...location,
    isLoading,
    error,
  };
}