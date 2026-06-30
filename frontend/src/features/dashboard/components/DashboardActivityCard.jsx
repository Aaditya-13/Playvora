import {
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { format } from "date-fns";

import Button from "../../../components/ui/Button";
import ActivityStatusBadge from "./ActivityStatusBadge";

export default function DashboardActivityCard({
  activity,
  primaryAction,
  secondaryAction,
}) {
  return (
    <article className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-lg font-bold text-zinc-900">
            {activity.title}
          </h3>

          <div className="mt-2">

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold capitalize text-zinc-700">
              {activity.sport}
            </span>

          </div>

        </div>

        <ActivityStatusBadge
          status={activity.status}
        />

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <Calendar size={16} />

          <span>
            {format(
              new Date(activity.scheduledAt),
              "dd MMM • hh:mm a"
            )}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <MapPin size={16} />

          <span className="truncate">
            {activity.groundName}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">

          <Users size={16} />

          <span>
            {activity.currentPlayers} / {activity.maxPlayers} Players
          </span>

        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold capitalize text-violet-700">
          {activity.skillLevel}
        </span>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold capitalize text-sky-700">
          {activity.venueType}
        </span>

        {activity.attendance?.status && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${activity.attendance.status === "present"
                ? "bg-emerald-100 text-emerald-700"
                : activity.attendance.status === "late"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {activity.attendance.status}
          </span>
        )}

      </div>

      <div className="mt-6 flex gap-3">

        {secondaryAction && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}

        {primaryAction && (
          <Button
            className="flex-1"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        )}

      </div>

    </article>
  );
}