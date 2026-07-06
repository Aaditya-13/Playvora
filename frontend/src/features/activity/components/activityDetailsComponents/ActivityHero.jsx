import {
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";

export default function ActivityHero({
  activity,
}) {
  const date = new Date(activity.scheduledAt);

  const STATUS_STYLES = {
    open: "bg-green-100 text-green-700 border-green-200",
    full: "bg-orange-100 text-orange-700 border-orange-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const SPORT_META = {
    football: {
      emoji: "⚽",
      label: "Football",
    },
    cricket: {
      emoji: "🏏",
      label: "Cricket",
    },
    badminton: {
      emoji: "🏸",
      label: "Badminton",
    },
    basketball: {
      emoji: "🏀",
      label: "Basketball",
    },
    volleyball: {
      emoji: "🏐",
      label: "Volleyball",
    },
    tennis: {
      emoji: "🎾",
      label: "Tennis",
    },
    "table-tennis": {
      emoji: "🏓",
      label: "Table Tennis",
    },
    chess: {
      emoji: "♟️",
      label: "Chess",
    },
    carrom: {
      emoji: "🎯",
      label: "Carrom",
    },
    running: {
      emoji: "🏃",
      label: "Running",
    },
    cycling: {
      emoji: "🚴",
      label: "Cycling",
    },
    other: {
      emoji: "🎮",
      label: "Other",
    },
  };

  const sport =
    SPORT_META[activity.sport] || SPORT_META.other;

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 p-6 text-white">

        <div className="flex items-center justify-between">

          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm ${STATUS_STYLES[activity.status]}`}
          >
            {activity.status}
          </span>

        </div>

        <div className="mt-8">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">

            <span className="text-lg">
              {sport.emoji}
            </span>

            <span>
              {sport.label}
            </span>

          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            {activity.title}
          </h1>

          {activity.description && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-green-50 md:text-base">
              {activity.description}
            </p>
          )}

        </div>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-3">

        <div className="flex items-start gap-3">

          <div className="rounded-2xl bg-green-50 p-3 text-green-700">

            <Calendar size={20} />

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Date
            </p>

            <p className="mt-1 text-base font-bold text-zinc-900">
              {format(date, "EEEE")}
            </p>

            <p className="text-sm text-zinc-500">
              {format(date, "MMM d, yyyy")}
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <div className="rounded-2xl bg-green-50 p-3 text-green-700">

            <Clock size={20} />

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Time
            </p>

            <p className="mt-1 text-base font-bold text-zinc-900">
              {format(date, "h:mm a")}
            </p>

            <p className="text-sm text-zinc-500">
              Starts
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <div className="rounded-2xl bg-green-50 p-3 text-green-700">

            <MapPin size={20} />

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Venue
            </p>

            <p className="mt-1 text-base font-bold text-zinc-900">
              {activity.groundName}
            </p>

            <p className="line-clamp-2 text-sm text-zinc-500">
              {activity.address}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}