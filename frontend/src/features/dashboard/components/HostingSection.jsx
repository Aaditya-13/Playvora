import ActivityDashboardCard from "./ActivityDashboardCard";
import EmptyDashboard from "./EmptyDashboard";

export default function HostingSection({
  activities = [],
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold text-zinc-900">
          Hosting
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Activities you're organizing.
        </p>

      </div>

      {activities.length === 0 ? (
        <EmptyDashboard
          message="You aren't hosting any activities yet."
        />
      ) : (
        activities.map((activity) => (
          <ActivityDashboardCard
            key={activity._id}
            activity={activity}
            secondaryAction={{
              label: "Edit",
              onClick: () =>
                console.log("Edit", activity._id),
            }}
            primaryAction={{
              label: "Manage",
              onClick: () =>
                console.log("Manage", activity._id),
            }}
          />
        ))
      )}

    </section>
  );
}