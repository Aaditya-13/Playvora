import { useNavigate } from "react-router";

import ROUTES from "../../../constants/routes";

import useLeaveActivity from "../../activity/hooks/useLeaveActivity";

import ActivityDashboardCard from "./ActivityDashboardCard";
import EmptyDashboard from "./EmptyDashboard";

function JoinedActivityCard({ activity }) {
  const navigate = useNavigate();

  const leaveMutation = useLeaveActivity(activity._id);

  return (
    <ActivityDashboardCard
      activity={activity}
      secondaryAction={{
        label: "Leave",
        loading: leaveMutation.isPending,
        onClick: () => {
          const confirmed = window.confirm(
            "Are you sure you want to leave this activity?"
          );

          if (!confirmed) return;

          leaveMutation.mutate();
        },
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
  );
}

export default function JoinedSection({
  activities = [],
}) {
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
          <JoinedActivityCard
            key={activity._id}
            activity={activity}
          />
        ))
      )}

    </section>
  );
}