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
    <article className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1FAA59]/30 hover:shadow-[0_16px_40px_rgb(31,170,89,0.12)]">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-extrabold text-zinc-900">
            {activity.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">

            <span className="inline-flex items-center rounded-full bg-[#1FAA59] px-3 py-1 text-xs font-bold text-white shadow-sm">
              {activity.sport}
            </span>

            <span className="inline-flex items-center rounded-full border border-[#1FAA59]/30 bg-[#1FAA59]/5 px-3 py-1 text-xs font-bold text-[#1FAA59]">
              {activity.skillLevel}
            </span>

          </div>

        </div>

        <div className="text-right">

          {activity.cost.amount === 0 ? (
            <p className="text-xl font-extrabold text-[#1FAA59]">
              Free
            </p>
          ) : (
            <div className="flex items-center justify-end gap-0.5 text-xl font-extrabold text-[#1FAA59]">

              <IndianRupee size={20} strokeWidth={2.5} />

              {activity.cost.amount}

            </div>
          )}

          <p className="text-xs text-zinc-500">
            {activity.cost.description}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">

          <MapPin size={18} className="text-[#1FAA59]" fill="currentColor" fillOpacity={0.2} />

          <span className="truncate">{activity.groundName}</span>

        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">

          <Calendar size={18} className="text-[#1FAA59]" fill="currentColor" fillOpacity={0.2} />

          <span>
            {format(
              new Date(activity.scheduledAt),
              "EEE, MMM d • h:mm a"
            )}
          </span>

        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600">
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-[#1FAA59]" fill="currentColor" fillOpacity={0.2} />
              Players
            </span>
            <span className="text-zinc-500">{activity.currentPlayers} / {activity.maxPlayers}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${activity.currentPlayers / activity.maxPlayers < 0.3 ? 'bg-orange-500' : 'bg-[#1FAA59]'}`}
              style={{ width: `${Math.min((activity.currentPlayers / activity.maxPlayers) * 100, 100)}%` }}
            />
          </div>
        </div>

      </div>

      <button
        onClick={() =>
          navigate(`/activities/${activity._id}`)
        }
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-100 py-3.5 font-bold text-zinc-700 transition hover:border-[#1FAA59]/30 hover:bg-[#1FAA59]/5 hover:text-[#1FAA59]"
      >
        View Details

        <ChevronRight size={18} strokeWidth={2.5} />

      </button>

    </article>
  );
}