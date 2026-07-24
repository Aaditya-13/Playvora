import { useEffect, useState } from "react";

import BottomNavigation from "../../../components/shared/BottomNavigation";

import HomeHeader from "../components/HomeHeader";
import SearchEntryCard from "../components/SearchEntryCard";
import SportFilterRow from "../components/SportFilterRow";
import NearbySection from "../components/NearbySection";
import ActivityList from "../components/ActivityList";
import ActivitySkeleton from "../components/ActivitySkeleton";
import EmptyState from "../components/EmptyState";

import useNearbyActivities from "../hooks/useNearbyActivities";
import useLocation from "../../../hooks/useLocation";
import useAuthStore from "../../../store/authStore";

export default function Home() {
  const user = useAuthStore(
    (state) => state.user
  );

  const { getLocation, requestBrowserLocation } = useLocation();

  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  const [selectedSport, setSelectedSport] =
    useState("");

  const [location, setLocation] =
    useState(null);
  useEffect(() => {
    async function loadLocation() {
      const currentLocation = await getLocation();

      if (currentLocation) {
        setLocation(currentLocation);
      }
    }

    loadLocation();

    const handleLocationUpdate = () => loadLocation();
    window.addEventListener("locationUpdated", handleLocationUpdate);
    return () => window.removeEventListener("locationUpdated", handleLocationUpdate);
  }, [getLocation]);

  const handleUpdateLocation = async () => {
    setIsUpdatingLocation(true);
    try {
      await requestBrowserLocation();
    } catch (error) {
      console.error("Failed to update location:", error);
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  const {
    data,
    isLoading,
  } = useNearbyActivities({
    latitude: location?.latitude,
    longitude: location?.longitude,
    sport: selectedSport,
  });

  const activities =
    data?.data?.activities ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 pb-24">
      <div className="bg-gradient-to-br from-[#1FAA59] to-[#0d5c2e] px-4 pt-10 pb-16">
        <div className="mx-auto max-w-5xl">
          <HomeHeader
            user={user}
            location={location}
            onUpdateLocation={handleUpdateLocation}
            isUpdatingLocation={isUpdatingLocation}
          />
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 -mt-8">
        <SearchEntryCard />

        <SportFilterRow
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        <NearbySection
          count={activities.length}
        >

          {isLoading ? (
            <ActivitySkeleton />
          ) : activities.length === 0 ? (
            <EmptyState />
          ) : (
            <ActivityList
              activities={activities}
            />
          )}

        </NearbySection>

      </section>

      <BottomNavigation />

    </main>
  );
}