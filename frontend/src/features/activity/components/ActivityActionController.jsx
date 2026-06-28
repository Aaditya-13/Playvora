import { useNavigate } from "react-router";
import Button from "../../../components/ui/Button.jsx";
import useAuthStore from "../../../store/authStore.js";

export default function ActivityActionController({ activity, isJoining, onJoin, isLeaving, onLeave }) {
  const navigate = useNavigate();
  const { user, isGuest } = useAuthStore();

  if (isGuest) {
    return (
      <Button className="w-full mt-2" onClick={() => navigate("/register")}>
        Create Free Account to Join
      </Button>
    );
  }

  const hostId = typeof activity.host === "object" ? activity.host?._id : activity.host;
  const isHost = user?._id === hostId;

  if (isHost) {
    return (
      <div className="flex gap-3 w-full mt-2">
        <Button variant="outline" className="w-1/2" onClick={() => console.log("Edit")}>
          Edit
        </Button>
        <Button className="w-1/2" onClick={() => console.log("Manage")}>
          Manage Players
        </Button>
      </div>
    );
  }

  const isParticipant = activity.participants?.some((p) => p._id === user?._id);

  if (isParticipant) {
    return (
      <Button 
        variant="outline" 
        className="w-full mt-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" 
        onClick={onLeave}
        disabled={isLeaving}
      >
        {isLeaving ? "Leaving..." : "Leave Activity"}
      </Button>
    );
  }

  return (
    <Button className="w-full mt-2" onClick={onJoin} disabled={isJoining}>
      {isJoining ? "Sending Request..." : "Join Activity"}
    </Button>
  );
}