import ActivityDashboardCard from "./ActivityDashboardCard";
import EmptyDashboard from "./EmptyDashboard";

export default function CompletedSection({
  activities = [],
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold text-zinc-900">
          Completed
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Your activity history.
        </p>

      </div>

      {activities.length === 0 ? (
        <EmptyDashboard
          message="No completed activities yet."
        />
      ) : (
        activities.map((activity) => (
          <ActivityDashboardCard
            key={activity._id}
            activity={activity}
            primaryAction={{
              label: "View",
              onClick: () =>
                console.log("View", activity._id),
            }}
          />
        ))
      )}

    </section>
  );
}