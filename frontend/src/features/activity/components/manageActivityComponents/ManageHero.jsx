import { Calendar, MapPin, Users } from "lucide-react";
import Badge from "../../../../components/ui/Badge";
import { formatDate, formatTime, capitalize } from "../../../../utils/formatters";

export default function ManageHero({ activity }) {
  if (!activity) return null;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold text-zinc-900">
            {activity.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">

            <Badge>
              {capitalize(activity.sport)}
            </Badge>

            <Badge>
              {capitalize(activity.status)}
            </Badge>

          </div>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-zinc-900">
            {activity.currentPlayers}/{activity.maxPlayers}
          </p>

          <p className="text-sm text-zinc-500">
            Players
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <Calendar size={18} />
          <span>
            {formatDate(activity.scheduledAt)} • {formatTime(activity.scheduledAt)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <MapPin size={18} />
          <span>
            {activity.groundName}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <Users size={18} />
          <span>
            {activity.currentPlayers} of {activity.maxPlayers} players joined
          </span>
        </div>

      </div>

    </section>
  );
}