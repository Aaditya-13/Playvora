import { useNavigate, useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import BackButton from "../../../components/ui/BackButton";

import useActivityDetails from "../hooks/useActivityDetails";
import useJoinActivity from "../hooks/useJoinActivity";
import useLeaveActivity from "../hooks/useLeaveActivity";

import LoadingState from "../components/activityDetailsComponents/LoadingState";
import ErrorState from "../components/activityDetailsComponents/ErrorState";

import ActivityHero from "../components/activityDetailsComponents/ActivityHero";
import ActivityStatsCard from "../components/activityDetailsComponents/ActivityStatsCard";
import ActivityMapCard from "../components/activityDetailsComponents/ActivityMapCard";
import GameDetailsCard from "../components/activityDetailsComponents/GameDetailsCard";
import OrganizerCard from "../components/activityDetailsComponents/OrganizerCard";
import ParticipantsCard from "../components/activityDetailsComponents/ParticipantsCard";
import NotesCard from "../components/activityDetailsComponents/NotesCard";
import BottomActionBar from "../components/activityDetailsComponents/BottomActionBar";

export default function ActivityDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useActivityDetails(id);

  const {
    mutate: join,
    isPending: isJoining,
  } = useJoinActivity(id);

  const {
    mutate: leave,
    isPending: isLeaving,
  } = useLeaveActivity(id);

  if (isLoading) {
    return (
      <ScreenContainer className="bg-zinc-50 py-6">
        <LoadingState />
      </ScreenContainer>
    );
  }

  if (isError || !data?.data) {
    return (
      <ScreenContainer className="bg-zinc-50">
        <ErrorState
          onRetry={refetch}
          onBack={() => navigate(-1)}
        />
      </ScreenContainer>
    );
  }

  const activity = data.data;

  return (
    <ScreenContainer className="bg-zinc-50 pb-28">

      <PageHeader 
        title="Activity Details" 
        leftNode={
          <BackButton />
        }
      />

      <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-6">

        <ActivityHero
          activity={activity}
        />

        <ActivityStatsCard
          activity={activity}
        />
        <div className="relative isolate">
          <ActivityMapCard
            activity={activity}
          />
        </div>
        <GameDetailsCard
          activity={activity}
        />

        <OrganizerCard
          organizer={activity.organizer}
        />

        <ParticipantsCard
          activity={activity}
        />

        <NotesCard
          activity={activity}
        />

        <BottomActionBar
          activity={activity}
          isJoining={isJoining}
          isLeaving={isLeaving}
          onJoin={join}
          onLeave={leave}
        />

      </div>

    </ScreenContainer>
  );
}