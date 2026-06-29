import {
  Calendar,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";

import { format } from "date-fns";
import { useNavigate } from "react-router";

import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

export default function ActivityDashboardCard({
  activity,
  primaryAction,
  secondaryAction,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-zinc-900">
            {activity.title}
          </h3>

          <div className="mt-2">
            <Badge>
              {activity.sport}
            </Badge>
          </div>

        </div>

        <button
          onClick={() =>
            navigate(`/activities/${activity._id}`)
          }
          className="rounded-xl p-2 transition hover:bg-zinc-100"
        >
          <ChevronRight size={18} />
        </button>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Calendar size={16} />

          {format(
            new Date(activity.scheduledAt),
            "EEE, MMM d • h:mm a"
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <MapPin size={16} />

          {activity.groundName}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Users size={16} />

          {activity.currentPlayers} / {activity.maxPlayers}
        </div>

      </div>

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex gap-3">

          {secondaryAction && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.loading}
            >
              {secondaryAction.loading
                ? "Please wait..."
                : secondaryAction.label}
            </Button>
          )}

          {primaryAction && (
            <Button
              className="flex-1"
              onClick={primaryAction.onClick}
              disabled={primaryAction.loading}
            >
              {primaryAction.loading
                ? "Please wait..."
                : primaryAction.label}
            </Button>
          )}

        </div>
      )}

    </div>
  );
}