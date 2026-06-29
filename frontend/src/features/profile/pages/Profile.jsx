import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import useProfile from "../hooks/useProfile";

import ProfileHero from "../components/ProfileHero";
import ProfileInfoCard from "../components/ProfileInfoCard";
import ProfileStats from "../components/ProfileStats";
import QuickActionsCard from "../components/QuickActionsCard";

import ProfileLoading from "../components/ProfileLoading";
import ProfileError from "../components/ProfileError";
import useLogout from "../hooks/useLogout";

export default function Profile() {


  const {
    user,
    isLoading,
    isError,
  } = useProfile();

  const {
    mutate: logout,
    isPending: isLoggingOut,
  } = useLogout();


  if (isLoading) {
    return (
      <ScreenContainer className="bg-zinc-50">
        <ProfileLoading />
      </ScreenContainer>
    );
  }

  if (isError || !user) {
    return (
      <ScreenContainer className="bg-zinc-50">
        <ProfileError onRetry={() => window.location.reload()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-zinc-50 pb-24">

      <PageHeader title="Profile" />

      <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-8 px-4">

        <ProfileHero user={user} />

        <ProfileInfoCard user={user} />

        <ProfileStats user={user} />

        <QuickActionsCard
          onLogout={logout}
          isLoggingOut={isLoggingOut}
        />

      </div>

    </ScreenContainer>
  );
}