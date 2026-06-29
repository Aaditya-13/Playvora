import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

import { format } from "date-fns";
import { useNavigate } from "react-router";

import Badge from "../../../components/ui/Badge";

export default function ActivityCard({
  activity,
}) {
  const navigate = useNavigate();

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-green-200 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-bold text-zinc-900">
            {activity.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">

            <Badge>
              {activity.sport}
            </Badge>

            <Badge variant="secondary">
              {activity.skillLevel}
            </Badge>

          </div>

        </div>

        <div className="text-right">

          {activity.cost.amount === 0 ? (
            <p className="font-bold text-green-600">
              Free
            </p>
          ) : (
            <div className="flex items-center justify-end gap-1 font-bold text-zinc-900">

              <IndianRupee size={16} />

              {activity.cost.amount}

            </div>
          )}

          <p className="text-xs text-zinc-500">
            {activity.cost.description}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <MapPin size={16} />

          <span>{activity.groundName}</span>

        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <Calendar size={16} />

          <span>
            {format(
              new Date(activity.scheduledAt),
              "EEE, MMM d • h:mm a"
            )}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <Users size={16} />

          <span>
            {activity.currentPlayers} / {activity.maxPlayers} Players
          </span>

        </div>

      </div>

      <button
        onClick={() =>
          navigate(`/activities/${activity._id}`)
        }
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 py-3 font-semibold transition hover:border-green-300 hover:bg-green-50"
      >
        View Details

        <ChevronRight size={18} />

      </button>

    </article>
  );
}