import Badge from "../../../components/ui/Badge.jsx";

export default function ActivityHeader({ activity }) {
  return (
    <div className="bg-white p-4 border border-zinc-200 rounded-xl shadow-sm flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
        {activity.title}
      </h1>
      
      <div className="flex flex-wrap gap-2 mt-1">
        <Badge variant="primary">{activity.sport}</Badge>
        {activity.skillLevel && (
          <Badge variant="outline" className="capitalize">
            {activity.skillLevel}
          </Badge>
        )}
        {activity.venueType && (
          <Badge variant="secondary" className="capitalize">
            {activity.venueType}
          </Badge>
        )}
      </div>
    </div>
  );
}