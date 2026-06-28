import { Link } from "react-router";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import Badge from "../../../components/ui/Badge.jsx";

export default function ActivityCard({ activity }) {
  const dateObj = new Date(activity.scheduledAt);
  const participantCount = activity.participants?.length || 0;
  const isFull = participantCount >= activity.maxPlayers;

  return (
    <Link 
      to={`/activities/${activity._id}`}
      className="block bg-white border border-zinc-200 rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center justify-between mb-3">
        <Badge className="bg-zinc-100 text-zinc-900 font-bold capitalize px-3 py-1">
          {activity.sport}
        </Badge>
        {activity.skillLevel && (
          <span className="text-xs font-medium text-zinc-500 capitalize">
            {activity.skillLevel}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-1">
        {activity.title}
      </h3>
      
      <div className="flex items-center gap-1.5 text-zinc-500 mb-4">
        <MapPin size={16} />
        <span className="text-sm font-medium">
          {activity.groundName}
          {activity.distance && ` • ${activity.distance}km`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-zinc-100">
        <div className="flex items-center gap-2 text-zinc-700">
          <Calendar size={16} className="text-zinc-400" />
          <span className="text-sm font-medium">{format(dateObj, "MMM d")}</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-700">
          <Clock size={16} className="text-zinc-400" />
          <span className="text-sm font-medium">{format(dateObj, "h:mm a")}</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-700">
          <Users size={16} className={isFull ? "text-red-400" : "text-zinc-400"} />
          <span className={`text-sm font-medium ${isFull ? "text-red-600" : ""}`}>
            {participantCount}/{activity.maxPlayers}
          </span>
        </div>
      </div>
    </Link>
  );
}