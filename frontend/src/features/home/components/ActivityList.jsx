import useNearbyActivities from "../../activity/hooks/useNearbyActivities.js";
import useFilterStore from "../../../store/filterStore.js";
import ActivityCard from "./ActivityCard.jsx";
import ActivitySkeleton from "./ActivitySkeleton.jsx";
import EmptyState from "./EmptyState.jsx";

export default function ActivityList() {
  const { searchQuery, selectedSport } = useFilterStore();

  const queryParams = {
    ...(searchQuery && { q: searchQuery }),
    ...(selectedSport !== "All" && { sport: selectedSport }),
  };

  const { data, isLoading, isError } = useNearbyActivities(queryParams);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <ActivitySkeleton />
        <ActivitySkeleton />
        <ActivitySkeleton />
      </div>
    );
  }

  const activities = data?.data?.activities || [];

  if (isError || activities.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-4">
      {activities.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}
    </div>
  );
}