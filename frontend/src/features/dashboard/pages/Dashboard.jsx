import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import useDashboard from "../hooks/useDashboard";

import DashboardHero from "../components/DashboardHero";
import DashboardStats from "../components/DashboardStats";

import HostingSection from "../components/HostingSection";
import JoinedSection from "../components/JoinedSection";
import CompletedSection from "../components/CompletedSection";

import DashboardLoading from "../components/DashboardLoading";
import EmptyDashboard from "../components/EmptyDashboard";

export default function Dashboard() {
const {
  data,
  isLoading,
  isError,
} = useDashboard();

  if (isLoading) {
    return (
      <ScreenContainer className="bg-zinc-50 py-6">
        <DashboardLoading />
      </ScreenContainer>
    );
  }

  if (isError || !data) {
    return (
      <ScreenContainer className="bg-zinc-50 py-6">
        <EmptyDashboard
          message="Couldn't load your dashboard."
        />
      </ScreenContainer>
    );
  }

const hosting = data?.hosting ?? [];

const joined = data?.joined ?? [];

const completed = [];

const stats = {
  hosting: hosting.length,
  joined: joined.length,
  completed: completed.length,
};

  const hasActivities =
    hosting.length ||
    joined.length ||
    completed.length;

  return (
    <ScreenContainer className="bg-zinc-50 pb-24">

      <PageHeader
        title="Dashboard"
      />

      <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-6 px-4">

        <DashboardHero />

        <DashboardStats
          stats={stats}
        />

        {!hasActivities && (
          <EmptyDashboard
            message="You don't have any activities yet."
          />
        )}

        {hosting.length > 0 && (
          <HostingSection
            activities={hosting}
          />
        )}

        {joined.length > 0 && (
          <JoinedSection
            activities={joined}
          />
        )}

        {completed.length > 0 && (
          <CompletedSection
            activities={completed}
          />
        )}

      </div>

    </ScreenContainer>
  );
}