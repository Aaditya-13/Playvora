import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import ScreenContainer from "../../../components/ui/ScreenContainer.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";

import useActivityDetails from "../hooks/useActivityDetails.js";
import useJoinActivity from "../hooks/useJoinActivity.js";
import useLeaveActivity from "../hooks/useLeaveActivity.js";

import ActivityHeader from "../components/ActivityHeader.jsx";
import ActivityInfoMatrix from "../components/ActivityInfoMatrix.jsx";
import ActivityHostBio from "../components/ActivityHostBio.jsx";
import ActivityParticipantRoster from "../components/ActivityParticipantRoster.jsx";
import ActivityActionController from "../components/ActivityActionController.jsx"; 

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useActivityDetails(id);
  const { mutate: join, isPending: isJoining } = useJoinActivity(id);
  const { mutate: leave, isPending: isLeaving } = useLeaveActivity(id);

  if (isLoading) {
    return (
      <ScreenContainer className="flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-500 animate-pulse font-medium">Loading activity...</p>
      </ScreenContainer>
    );
  }

  if (isError || !data?.data) {
    return (
      <ScreenContainer className="flex flex-col items-center justify-center gap-4 bg-zinc-50">
        <p className="text-red-500 font-medium">Failed to load activity.</p>
        <button onClick={() => navigate(-1)} className="text-sm font-bold text-zinc-900 bg-white border border-zinc-200 px-6 py-2.5 rounded-xl shadow-sm">
          Go Back
        </button>
      </ScreenContainer>
    );
  }

  const activity = data.data;

  return (
    <ScreenContainer className="bg-zinc-50 pb-20">
      <PageHeader 
        leftNode={
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
        }
        title="Activity Details" 
      />

      <div className="flex flex-col gap-5 mt-4 px-4 max-w-2xl mx-auto pb-6">
        <ActivityHeader activity={activity} />
        <ActivityInfoMatrix activity={activity} />
        
        {activity.notes && (
          <div className="bg-white p-5 border border-zinc-200 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 mb-2">About this game</h3>
            <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">{activity.notes}</p>
          </div>
        )}

        <ActivityHostBio host={activity.host} />
        
        <ActivityParticipantRoster 
          maxPlayers={activity.maxPlayers} 
          participants={activity.participants} 
        />

        <ActivityActionController 
          activity={activity} 
          isJoining={isJoining} 
          onJoin={() => join()} 
          isLeaving={isLeaving}
          onLeave={() => leave()}
        />
      </div>
    </ScreenContainer>
  );
}