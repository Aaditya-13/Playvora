import { Calendar, Clock, MapPin, IndianRupee, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function ActivityInfoMatrix({ activity }) {
  const dateObj = new Date(activity.scheduledAt);
  
  // Google Maps search URL using coordinates
  const lng = activity.location.coordinates[0];
  const lat = activity.location.coordinates[1];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  
  return (
    <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-zinc-50 rounded-xl text-zinc-600 border border-zinc-100">
          <Calendar size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Date</p>
          <p className="text-sm font-bold text-zinc-900">{format(dateObj, "EEE, MMM do, yyyy")}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-zinc-50 rounded-xl text-zinc-600 border border-zinc-100">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Time</p>
          <p className="text-sm font-bold text-zinc-900">{format(dateObj, "h:mm a")}</p>
        </div>
      </div>

      {/* Clickable Google Maps Block */}
      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-start gap-3 group active:scale-95 transition-transform"
      >
        <div className="p-2.5 bg-green-50 rounded-xl text-green-600 border border-green-100 group-hover:bg-green-100 transition-colors">
          <MapPin size={20} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Location</p>
            <ExternalLink size={12} className="text-zinc-400" />
          </div>
          <p className="text-sm font-bold text-zinc-900">{activity.groundName}</p>
          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{activity.address}</p>
        </div>
      </a>

      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-zinc-50 rounded-xl text-zinc-600 border border-zinc-100">
          <IndianRupee size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Cost</p>
          <p className="text-sm font-bold text-zinc-900">
            {activity.cost?.amount === 0 ? "Free" : `${activity.cost?.currency} ${activity.cost?.amount}`}
          </p>
          {activity.cost?.amount > 0 && activity.cost?.description && (
            <p className="text-xs text-zinc-500 mt-0.5">{activity.cost.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}