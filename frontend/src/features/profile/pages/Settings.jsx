import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import SecurityCard from "../components/SecurityCard";
import DangerZoneCard from "../components/DangerZoneCard";

export default function Settings() {
  return (
    <ScreenContainer className="bg-zinc-50 pb-24">

      <PageHeader title="Settings" />

      <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 px-4">

        <SecurityCard />

        <DangerZoneCard />

      </div>

    </ScreenContainer>
  );
}