import ActivityDashboardCard from "./ActivityDashboardCard";
import EmptyDashboard from "./EmptyDashboard";
import { useNavigate } from "react-router";
import ROUTES from "../../../constants/routes";

export default function JoinedSection({
  activities = [],
}) {
  const navigate = useNavigate();
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold text-zinc-900">
          Joined
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Activities you're participating in.
        </p>

      </div>

      {activities.length === 0 ? (
        <EmptyDashboard
          message="You haven't joined any activities."
        />
      ) : (
        activities.map((activity) => (
          <ActivityDashboardCard
            key={activity._id}
            activity={activity}
            secondaryAction={{
              label: "Leave",
              onClick: () => console.log("Leave", activity._id),
            }}
            primaryAction={{
              label: "View",
              onClick: () =>
                navigate(
                  ROUTES.ACTIVITY_DETAILS.replace(
                    ":id",
                    activity._id
                  )
                ),
            }}
          />
        ))
      )}

    </section>
  );
}