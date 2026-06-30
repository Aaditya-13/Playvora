import { ArrowLeft } from "lucide-react";
import {
  useNavigate,
  useParams,
  Navigate
} from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import DashboardActivityCard from "../components/DashboardActivityCard";
import EmptyDashboard from "../components/EmptyDashboard";
import DashboardLoading from "../components/DashboardLoading";

import useDashboard from "../hooks/useDashboard";
import ROUTES from "../../../constants/routes";

import {
  getHostedActions,
  getJoinedActions,
} from "../utils/dashboardActions";

export default function DashboardActivityList() {
  const navigate = useNavigate();

  const { type } = useParams();



  const {
    data,
    isLoading,
  } = useDashboard();

  const VALID_TYPES = ["hosting", "joined"];

  if (!VALID_TYPES.includes(type)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (isLoading) {
    return <DashboardLoading />;
  }

  const hostedActions =
    getHostedActions(navigate);

  const joinedActions =
    getJoinedActions(
      navigate,
      (activityId) =>
        console.log("Leave", activityId)
    );

  const isHosting =
    type === "hosting";

  const title = isHosting
    ? "Hosting Activities"
    : "Joined Activities";

  const description = isHosting
    ? "Activities you're organizing."
    : "Activities you've joined.";

  const activities = isHosting
    ? data.hostedActivities
    : data.joinedActivities;

  const actions = isHosting
    ? hostedActions
    : joinedActions;

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <PageHeader
        title={title}
        leftNode={
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5">

        <p className="text-sm text-zinc-500">
          {description}
        </p>

        {activities.length === 0 ? (
          <EmptyDashboard
            message={`No ${type} activities yet.`}
          />
        ) : (
          activities.map((activity) => (
            <DashboardActivityCard
              key={activity._id}
              activity={activity}
              primaryAction={
                actions.primary(activity)
              }
              secondaryAction={
                actions.secondary(activity)
              }
            />
          ))
        )}

      </div>

    </ScreenContainer>
  );
}