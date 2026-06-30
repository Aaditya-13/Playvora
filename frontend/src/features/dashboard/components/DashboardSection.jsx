import { ChevronRight } from "lucide-react";

import DashboardActivityCard from "./DashboardActivityCard";
import EmptyDashboard from "./EmptyDashboard";

export default function DashboardSection({
  title,
  description,
  activities = [],
  primaryAction,
  secondaryAction,
  onViewAll,
}) {
  return (
    <section className="space-y-4">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-zinc-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {description}
          </p>

        </div>

        {activities.length > 0 && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            View All

            <ChevronRight size={16} />
          </button>
        )}

      </div>

      {activities.length === 0 ? (
        <EmptyDashboard
          message={`No ${title.toLowerCase()} activities yet.`}
        />
      ) : (
        <div className="space-y-4">

          {activities
            .slice(0, 2)
            .map((activity) => (
              <DashboardActivityCard
                key={activity._id}
                activity={activity}
                primaryAction={primaryAction(activity)}
                secondaryAction={
                  secondaryAction
                    ? secondaryAction(activity)
                    : null
                }
              />
            ))}

        </div>
      )}

    </section>
  );
}