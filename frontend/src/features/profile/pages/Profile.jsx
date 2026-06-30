import ScreenContainer from "../../../components/ui/ScreenContainer";

import ProfileHeader from "../components/ProfileHeader";
import PersonalInformation from "../components/PersonalInformation";
import ProfileStats from "../components/ProfileStats";
import QuickActionsCard from "../components/QuickActionsCard";
import ProfileLoading from "../components/ProfileLoading";
import ProfileError from "../components/ProfileError";

import useProfile from "../hooks/useProfile";
import useLogout from "../hooks/useLogout"

export default function Profile() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProfile();

    const {
    mutate: logout,
    isPending: isLoggingOut,
  } = useLogout();

  if (isLoading) {
    return (
      <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <ProfileLoading />
        </div>
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <ProfileError
            onRetry={refetch}
          />
        </div>
      </ScreenContainer>
    );
  }

  const {
    user,
    stats,
  } = data;

  return (
    <ScreenContainer className="min-h-screen bg-zinc-100 pb-24">

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-5">

        <ProfileHeader
          user={user}
        />

        <PersonalInformation
          user={user}
        />

        <ProfileStats
          stats={stats}
        />

        <QuickActionsCard
          onLogout={logout}
          isLoggingOut={isLoggingOut}
        />

      </div>

    </ScreenContainer>
  );
}