import { useParams } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import BackButton from "../../../components/ui/BackButton";

import useEditActivityForm from "../hooks/useEditActivityForm";

import ActivityHero from "../components/createActivityComponents/ActivityHero";
import SportSelector from "../components/createActivityComponents/SportSelector";
import BasicDetailsCard from "../components/createActivityComponents/BasicDetailsCard";
import LocationCard from "../components/createActivityComponents/LocationCard";
import ScheduleCard from "../components/createActivityComponents/ScheduleCard";
import GameSettingsCard from "../components/createActivityComponents/GameSettingsCard";
import PricingCard from "../components/createActivityComponents/PricingCard";
import NotesCard from "../components/createActivityComponents/NotesCard";
import PublishBar from "../components/createActivityComponents/PublishBar";

export default function EditActivity() {
  const { id } = useParams();

  const {
    register,
    errors,
    setValue,

    submit,
    isPending,

    selectedSport,
    maxPlayers,
    visibilityRadius,
    latitude,
    longitude,
    
    searchLocation,
    increasePlayers,
    decreasePlayers,
    useCurrentLocation,

    SPORTS,
    SKILL_LEVELS,
    VENUE_TYPES,
    JOIN_POLICIES,
    GENDER_OPTIONS,
  } = useEditActivityForm(id);


  return (
    <ScreenContainer className="bg-zinc-100 pb-32">

      <PageHeader
        title="Edit Activity"
        leftNode={
        <BackButton />
        }
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">

        <ActivityHero />

        <SportSelector
          SPORTS={SPORTS}
          selectedSport={selectedSport}
          setValue={setValue}
          errors={errors}
        />

        <BasicDetailsCard
          register={register}
          errors={errors}
        />

        <LocationCard
          register={register}
          errors={errors}
          latitude={latitude}
          longitude={longitude}
          setValue={setValue}
          searchLocation={searchLocation}
          visibilityRadius={visibilityRadius}
          useCurrentLocation={useCurrentLocation}
        />

        <ScheduleCard
          register={register}
          errors={errors}
        />

        <GameSettingsCard
          register={register}
          errors={errors}
          maxPlayers={maxPlayers}
          visibilityRadius={visibilityRadius}
          increasePlayers={increasePlayers}
          decreasePlayers={decreasePlayers}
          SKILL_LEVELS={SKILL_LEVELS}
          VENUE_TYPES={VENUE_TYPES}
          JOIN_POLICIES={JOIN_POLICIES}
          GENDER_OPTIONS={GENDER_OPTIONS}
          setValue={setValue}
        />

        <PricingCard
          register={register}
          errors={errors}
        />

        <NotesCard
          register={register}
        />

      </div>

      <PublishBar
        submit={submit}
        isPending={isPending}
        buttonText="Save Changes"
      />

    </ScreenContainer>
  );
}
