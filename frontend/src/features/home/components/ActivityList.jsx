import ActivityCard from "./ActivityCard";

export default function ActivityList({
  activities,
}) {
  return (
    <div className="space-y-5">

      {activities.map((activity) => (
        <ActivityCard
          key={activity._id}
          activity={activity}
        />
      ))}

    </div>
  );
}