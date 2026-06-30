import { useNavigate } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";

import DashboardHero from "../components/DashboardHero";
import DashboardStats from "../components/DashboardStats";
import DashboardSection from "../components/DashboardSection";
import DashboardLoading from "../components/DashboardLoading";

import useDashboard from "../hooks/useDashboard";

import {
  getHostedActions,
  getJoinedActions,
} from "../utils/dashboardActions";

// import ROUTES from "../../../constants/routes";

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useDashboard();

  if (isLoading) {
    return <DashboardLoading />;
  }

  const {
    user,
    stats,
    hostedActivities,
    joinedActivities,
  } = data;

  const hostedActions =
    getHostedActions(navigate);

  const joinedActions =
    getJoinedActions(
      navigate,
      (activityId) =>
        console.log("Leave", activityId)
    );

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-5">

        <DashboardHero
          user={user}
        />

        <DashboardStats
          stats={stats}
        />

        <DashboardSection
          title="Hosting"
          description="Activities you're organizing."
          activities={hostedActivities}
          onViewAll={() =>
            navigate("/dashboard/hosting")
          }
          primaryAction={
            hostedActions.primary
          }
          secondaryAction={
            hostedActions.secondary
          }
        />

        <DashboardSection
          title="Joined"
          description="Activities you've joined."
          activities={joinedActivities}
          onViewAll={() =>
            navigate("/dashboard/joined")
          }
          primaryAction={
            joinedActions.primary
          }
          secondaryAction={
            joinedActions.secondary
          }
        />

      </div>

    </ScreenContainer>
  );
}