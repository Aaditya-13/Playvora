import { useState } from "react";

import BottomNavigation from "../../../components/shared/BottomNavigation";

import HomeHeader from "../components/HomeHeader";
import SearchEntryCard from "../components/SearchEntryCard";
import SportFilterRow from "../components/SportFilterRow";
import NearbySection from "../components/NearbySection";
import ActivityList from "../components/ActivityList";
import ActivitySkeleton from "../components/ActivitySkeleton";
import EmptyState from "../components/EmptyState";

import useNearbyActivities from "../hooks/useNearbyActivities";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import useCurrentUser from "../../auth/hooks/useCurrentUser"

export default function Home() {

const query = useCurrentUser();

const user = query.data?.data;

  
  
  const [selectedSport, setSelectedSport] =
    useState("");

  const {
    latitude,
    longitude,
  } = useCurrentLocation();

  const {
    data,
    isLoading,
  } = useNearbyActivities({
    latitude,
    longitude,
    sport: selectedSport,
  });

  const activities = data?.data?.activities ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 pb-24">

      <section className="mx-auto max-w-5xl px-4 py-6">

        <HomeHeader 
        user={user}
        />

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