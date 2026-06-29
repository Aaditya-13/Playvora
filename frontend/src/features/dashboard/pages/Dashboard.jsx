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
      <ScreenContainer className="bg-zinc-50">
        <DashboardLoading />
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer className="bg-zinc-50">
        <EmptyDashboard
          message="Couldn't load dashboard."
        />
      </ScreenContainer>
    );
  }

  const hosting = data?.hosting ?? [];
  const joined = data?.joined ?? [];
  const completed = data?.completed ?? [];

  const stats = {
    hosting: hosting.length,
    joined: joined.length,
    completed: completed.length,
  };

  return (
    <ScreenContainer className="bg-zinc-50 pb-24">

      <PageHeader title="Dashboard" />

      <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-6 px-4">

        <DashboardHero />

        <DashboardStats stats={stats} />

        <HostingSection
          activities={hosting}
        />

        <JoinedSection
          activities={joined}
        />

        <CompletedSection
          activities={completed}
        />

      </div>

    </ScreenContainer>
  );
}