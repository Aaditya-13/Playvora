import { useNavigate } from "react-router";
import ActivityCard from "./ActivityCard";
import ROUTES from "../../../constants/routes.js";

export default function ActivityList({
  activities,
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">

      {activities.map((activity) => (
        <ActivityCard
          key={activity._id}
          activity={activity}
        />
      ))}

      {activities.length === 1 && (
        <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <h4 className="text-lg font-bold text-zinc-900">That's all for now</h4>
          <p className="mt-2 text-sm text-zinc-500">Want to host a game yourself?</p>
          <button 
            onClick={() => navigate(ROUTES.CREATE)}
            className="mt-5 rounded-full bg-[#1FAA59] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#1FAA59]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1a904b] hover:shadow-lg hover:shadow-[#1FAA59]/40"
          >
            Host Activity
          </button>
        </div>
      )}

    </div>
  );
}