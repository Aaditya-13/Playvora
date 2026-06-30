import { useNavigate } from "react-router";
import Button from "../../../../components/ui/Button";
import useAuthStore from "../../../../store/authStore";
import ROUTES from "../../../../constants/routes";

export default function BottomActionBar({
  activity,
  isJoining,
  isLeaving,
  onJoin,
  onLeave,
}) {
  const navigate = useNavigate();

  const { user, isGuest } = useAuthStore();

  const organizerId =
    typeof activity.organizer === "object"
      ? activity.organizer._id
      : activity.organizer;

  const isOrganizer =
    user?._id === organizerId;

  const isParticipant =
    activity.participants?.some(
      (participant) =>
        participant._id === user?._id
    );

  if (isGuest) {
    return (
      <div className="sticky bottom-18 z-40 mt-6 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl">

        <Button
          className="w-full"
          onClick={() => navigate("/register")}
        >
          Create Free Account to Join
        </Button>

      </div>
    );
  }

  if (isOrganizer) {
    return (
      <div className="sticky bottom-18 z-40 mt-6 grid grid-cols-2 gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl">

        <Button
          variant="outline"
          onClick={() => {
            return navigate(
              ROUTES.EDIT_ACTIVITY.replace(
                ":id",
                activity._id
              )
            )
          }
          }
        >
          Edit Activity
        </Button>

        <Button
          onClick={() => {
            return navigate(
              ROUTES.MANAGE_ACTIVITY.replace(
                ":id",
                activity._id
              )
            )
          }
          }
        >
          Manage
        </Button>

      </div>
    );
  }

  if (isParticipant) {
    return (
      <div className="sticky bottom-18 z-40 mt-6 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl">

        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          disabled={isLeaving}
          onClick={onLeave}
        >
          {isLeaving
            ? "Leaving..."
            : "Leave Activity"}
        </Button>

      </div>
    );
  }

  return (
    <div className="sticky bottom-18 z-40 mt-6 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl">

      <div className="mb-4 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Participation Fee
          </p>

          <p className="text-2xl font-bold text-zinc-900">

            {activity.cost.amount === 0
              ? "Free"
              : `₹${activity.cost.amount}`}

          </p>

        </div>

        <div className="text-right">

          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Join Method
          </p>

          <p className="font-semibold text-zinc-900">

            {activity.joinPolicy === "approval"
              ? "Approval Required"
              : "Instant Join"}

          </p>

        </div>

      </div>

      <Button
        className="w-full"
        disabled={isJoining}
        onClick={onJoin}
      >
        {isJoining
          ? "Sending Request..."
          : activity.joinPolicy === "approval"
            ? "Request to Join"
            : "Join Activity"}
      </Button>

    </div>
  );
}